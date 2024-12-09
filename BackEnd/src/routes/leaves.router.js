import LeavesController from "../controller/leaves.controller.js";
import { Router } from "express";

const leavesRouter= Router()

leavesRouter.get('/all',LeavesController.findAll)
leavesRouter.get('/fields',LeavesController.getFieldNames)
leavesRouter.post('/create',LeavesController.create)
leavesRouter.patch('/update',LeavesController.create)
leavesRouter.get(`/:id`,LeavesController.findByID)

export default leavesRouter