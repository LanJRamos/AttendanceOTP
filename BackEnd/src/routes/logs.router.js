import { Router } from "express";
import LogsController from "../controller/logs.controller.js";

const logsRouter = Router()

logsRouter.get('/all',LogsController.findAll)
logsRouter.get('/fields',LogsController.getFieldNames)
logsRouter.get('/:id',LogsController.findByID)
logsRouter.post('/create',LogsController.create)
logsRouter.patch('/update',LogsController.update)


export default logsRouter