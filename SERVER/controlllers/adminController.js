import jwt from "jsonwebtoken"
import adminModel from "../models/adminModel.js"
import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import requestModel from "../models/requestModel.js"
import transporter from "../utils/nodeMailer.js"
const signupUrl = process.env.SIGNUP_URL
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
                await res.cookie('adminToken', token, { httpOnly: true, sameSite: 'none', secure: true })
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


const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        if (users) {
            res.status(200).json({
                success: true,
                message: "users list fetched successfully",
                users,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Failed to fetch updated user list",
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: "Failed to fetch updated user list",
            error: error.message,
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (userId) {
            const user = await userModel.findById(userId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            } else {
                await userModel.findByIdAndDelete(userId)
                res.status(200).json({
                    success: true,
                    message: "user deleted successfully",
                })
            }
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: "unexpected error",
        })
    }
}

const generateLink = async (req, res) => {
    const reqId = req.params.id
    try {
        const req = await requestModel.findById(reqId)
        const { email, _id } = req
        const token = jwt.sign(
            { email, requestId: _id },
            jwtKey
        )
        await requestModel.findByIdAndUpdate(
            reqId,
            { token }
        )
        const signupLink = `${signupUrl}?token=${token}`
        const mailOptions = {
            from: 'asenseai5@gmail.com',
            to: email,
            subject: 'Invitation Link',
            text: `Click the following link to signup: ${signupLink}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: 'Error sending email',
                });
            }
            res.status(200).json({
                success: true,
                message: 'Email sent successfully',
            });
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: 'Unexpected error while generating link',
        });
    }
}

const getRequsts = async (req, res) => {
    try {
        const requests = await requestModel.find({ token: { $exists: false } });

        if (requests) {
            res.status(200).json({
                success: true,
                message: "requests retrieved successfully",
                requests
            });
        } else {
            res.status(400).json({
                success: false,
                message: "error while fetching request list",
                requests: []
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "unexpected server error",
            requests: []
        });
    }
};





export { postLogin, postLogout, getUsers, deleteUser, generateLink, getRequsts }