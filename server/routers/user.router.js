import express from 'express'
import { deleteUser, testController, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyJWT.js'

const router = express.Router()

router.get('/test',testController)

router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)

export default router;