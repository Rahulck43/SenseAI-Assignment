import { Router } from "express";
import { getUser, getVerifyToken, postLogin, postLogout, postRequest, postSignup, putEditUser } from "../controlllers/userController";
import userAuth from "../middlewares/userAuth";
import upload from "../middlewares/upload";


const router=Router()
router.post('/request',postRequest)
router.post('/signup/:id',postSignup)
router.post('/logout',postLogout)
router.post('/login',postLogin)
router.get('/users/:id',userAuth,getUser)
router.put('/users/:id',userAuth,upload.single("file"),putEditUser)
router.get('/verify-token/:id',getVerifyToken)
router.post('/request',postRequest)



export default router