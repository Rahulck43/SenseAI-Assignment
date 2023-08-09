import { Router } from "express";
import { getUser, postLogin, postLogout, postSignup, putEditUser } from "../controlllers/userController";
import userAuth from "../middlewares/userAuth";
import upload from "../middlewares/upload";


const router=Router()
router.post('/signup',postSignup)
router.post('/logout',postLogout)
router.post('/login',postLogin)
router.get('/users/:id',userAuth,getUser)
router.put('/users/:id',userAuth,upload.single("file"),putEditUser)



export default router