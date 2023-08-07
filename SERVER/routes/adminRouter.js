import { Router } from "express";
import { postLogin, postLogout } from "../controlllers/adminController";


const router=Router()

router.post('/login',postLogin)
router.post('/logout',postLogout)


export default router