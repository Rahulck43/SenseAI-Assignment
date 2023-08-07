import jwt from "jsonwebtoken"
import userModel from "../models/userModel"
import bcrypt from 'bcrypt'

const jwtKey = process.env.JWT_KEY

const postSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExist = await userModel.findOne({ email: email });
        if (userExist) {
            res.status(409).json({
                success: false,
                message: 'User already exist, please login'
            });
        } else {
            const hash = await bcrypt.hash(password, 12);
            const user = new userModel({
                name: name,
                email: email,
                password: hash
            })
            const newUser = await user.save()
            const token = jwt.sign(
                { user_id: newUser._id, email },
                jwtKey,
                {
                    expiresIn: "2h",
                }
            )
            res.cookie('token', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
            res.status(200).json({
                success: true,
                message: 'User created successfully',
                user: newUser
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        });
    }
}


const postLogout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'You are not logged in'
            });
        } else {
            res.clearCookie('token');
            res.status(200).json({
                success: true,
                message: 'You have been logged out'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}


const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'email not found'
            });
        }
        const isPassValid = await bcrypt.compare(password, user.password);
        if (!isPassValid) {
            return res.status(401).json({
                success: false,
                message: 'invalid password'
            });
        }
        const token = jwt.sign(
            { user_id: user._id, email },
            jwtKey,
            {
                expiresIn: "2h",
            }
        );
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({
            success: true,
            message: 'login successful',
            user: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}


export { postSignup, postLogout, postLogin }