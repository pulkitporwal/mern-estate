import express from 'express'
import { testController, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyJWT.js'

const router = express.Router()

router.get('/test',testController)

router.post('/update/:id',verifyToken,updateUser)

export default router;