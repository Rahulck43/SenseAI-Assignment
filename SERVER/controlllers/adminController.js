import jwt from "jsonwebtoken"
import adminModel from "../models/adminModel"
import bcrypt from 'bcrypt'




const jwtKey = process.env.JWT_KEY


const postLogin = async (req, res) => {
    try {
        const { userName, password } = req.body
        const admin = await adminModel.findOne({ userName })
        if (!admin) {
            res.status(400).json({
                success: false,
                message: 'invalid user name'
            })
        } else {
            const isPassValid = await bcrypt.compare(password, admin.password);
            if (isPassValid) {
                const token = jwt.sign(
                    { userName },
                    jwtKey,
                    {
                        expiresIn: "2h",
                    }
                )
                await res.cookie('adminToken', token, { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 })
                res.status(200).json({
                    success: true,
                    message: 'admin logged in successfully',
                    admin
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'incorrect password'
                })
            }
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: 'unexpected internal error'
        })
    }
}


const postLogout = async (req, res) => {
    try {
        const token = req.cookies.adminToken;
        if (!token) {
            res.send({
                success: false,
                message: 'You are not logged in'
            });
        } else {
            res.clearCookie('adminToken');
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


export { postLogin, postLogout }