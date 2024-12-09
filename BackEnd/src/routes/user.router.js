import {Router} from 'express'
import UserController from '../controller/user.controller.js'

const userRouter = Router()

userRouter.get(`/all`,UserController.findAll)
userRouter.get(`/fields`,UserController.getFieldNames)
userRouter.get('/auth',UserController.authorize)
userRouter.get('/logout',UserController.logout)
userRouter.post('/login',UserController.login)
userRouter.post('/create',UserController.create)
userRouter.patch('/update',UserController.update)
userRouter.get('/:id',UserController.findByID)

export default userRouter