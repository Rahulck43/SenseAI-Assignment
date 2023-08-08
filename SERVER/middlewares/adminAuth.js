import jwt from 'jsonwebtoken'
const jwtKey = process.env.JWT_KEY




const adminAuth = async (req, res, next) => {
    const token = await req.cookies.adminToken;
    if (token) {
        jwt.verify(token, jwtKey, (err, decode) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'token verification failed'
                })
            } else {
                next()
            }
        })
    } else {
        res.status(401).json({
            success: false,
            message: 'token not found'
        })
    }
}

export default adminAuth