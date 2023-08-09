import jwt from 'jsonwebtoken'
const jwtKey = process.env.JWT_KEY




const userAuth = async (req, res, next) => {
    const token = await req.cookies.token;
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

export default userAuth