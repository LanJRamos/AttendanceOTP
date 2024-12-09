import ShiftController from "../controller/shift.controller.js";
import { Router } from "express";

const shiftRouter = Router()

shiftRouter.get('/all',ShiftController.findAll)
shiftRouter.get('/fields',ShiftController.getFieldNames)
shiftRouter.get('/count',ShiftController.getMonthCount)
shiftRouter.get('/:id',ShiftController.findByID)
shiftRouter.post('/',ShiftController.create)
shiftRouter.post('/conflict',ShiftController.getMonthDates)
shiftRouter.patch('/update',ShiftController.update)

export default shiftRouter