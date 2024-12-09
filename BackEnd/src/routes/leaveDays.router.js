import leaveDaysController from "../controller/leaveDays.controller.js";
import { Router } from "express";

const leaveDaysRouter = Router()

leaveDaysRouter.get('/',leaveDaysController.getAll)
leaveDaysRouter.get('/employee/:id',leaveDaysController.getByEmployee)
leaveDaysRouter.get('/:id',leaveDaysController.getAll)
leaveDaysRouter.post('/use',leaveDaysController.useDays)

export default leaveDaysRouter