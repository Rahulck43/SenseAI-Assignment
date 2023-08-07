import { Router } from "express";
import { postLogin, postLogout, postSignup } from "../controlllers/userController";


const router=Router()
router.post('/signup',postSignup)
router.post('/logout',postLogout)
router.post('/login',postLogin)



export default router