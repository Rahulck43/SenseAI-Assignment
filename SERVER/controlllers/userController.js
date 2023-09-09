import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import cloudinary from "../utils/cloudinary.js"
import requestModel from "../models/requestModel.js"
const jwtKey = process.env.JWT_KEY

const postSignup = async (req, res) => {
    const reqToken = req.params.id
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
                    expiresIn: "24h",
                }
            )
            const reslt = await requestModel.findOneAndDelete({ token: reqToken })
            res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true })
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
            res.status(404).json({
                success: false,
                message: 'email not found'
            });
        } else {
            const isPassValid = await bcrypt.compare(password, user.password);
            if (!isPassValid) {
                res.status(401).json({
                    success: false,
                    message: 'incorrect password'
                });
            } else {
                const token = jwt.sign(
                    { user_id: user._id, email },
                    jwtKey,
                    {
                        expiresIn: "24h",
                    }
                );
                res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true });

                res.status(200).json({
                    success: true,
                    message: 'login successful',
                    user: user
                })
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

const getUser = async (req, res) => {
    try {
        const email = req.params.id
        console.log(email)
        if (email) {
            const user = await userModel.findOne({ email })
            if (user) {
                res.status(200).json({
                    success: true,
                    message: 'user data retrieved',
                    user
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'unable to find user data',
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: 'unable to find user data',
            })
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: 'unable to find user data',
        })
    }
}

const putEditUser = async (req, res) => {
    try {
        const email = req.params.id
        const { name, mobileNo, address } = req.body
        if (req.file) {
            const streamUpload = (fileBuffer) => {
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream((error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    });
                    stream.write(fileBuffer);
                    stream.end();
                });
            };
            const result = await streamUpload(req.file.buffer);
            const updatedUser = await userModel.findOneAndUpdate(
                { email },
                {
                    mobileNo,
                    address,
                    name,
                    profileImg: result.secure_url
                },
                { new: true }
            )
            if (updatedUser) {
                res.status(200).json({
                    success: true,
                    message: 'user data updated successfully',
                    updatedUser
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'error updating userdata',
                })
            }
        } else {
            const updatedUser = await userModel.findOneAndUpdate(
                { email },
                {
                    mobileNo,
                    address,
                    name,
                },
                { new: true }
            )
            if (updatedUser) {
                res.status(200).json({
                    success: true,
                    message: 'user data updated successfully',
                    updatedUser
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: 'error updating userdata',
                })
            }
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            message: 'unexpected error updating userdata',
        })
    }
}

const postRequest = async (req, res) => {
    try {
        const { email, description } = req.body;
        const existingRequest = await requestModel.findOne({ email });
        console.log(existingRequest)

        if (existingRequest) {
            if (existingRequest?.token) {
                res.status(409).json({
                    success: true,
                    message:'Your invite link is already sent, please check your inbox'
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Your request is already sent, please wait for Admin response'
                });
            }
        } else {
            const newRequest = new requestModel({
                email,
                description,
            });
            await newRequest.save();
            res.status(200).json({
                success: true,
                message: 'You will receive an invite link shortly...!!!'
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: 'Unexpected network error'
        });
    }
};

const getVerifyToken = async (req, res) => {
    try {
        const token = req.params.id
        const verify = await requestModel.findOne({ token })
        if (verify) {
            res.status(200).json({
                success: true,
                message: 'token verified successfully'
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'token verification failed'
            });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: 'Unexpected network error'
        });
    }
}





export { postSignup, postLogout, postLogin, getUser, putEditUser, postRequest, getVerifyToken }