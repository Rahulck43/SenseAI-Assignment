import { Router } from "express";
import { deleteUser, getUsers, postLogin, postLogout } from "../controlllers/adminController";
import adminAuth from "../middlewares/adminAuth";


const router=Router()

router.post('/login',postLogin)
router.post('/logout',postLogout)
router.get('/users',adminAuth,getUsers)
router.delete('/users/:id',adminAuth,deleteUser)


export default router