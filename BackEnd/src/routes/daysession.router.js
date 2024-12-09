import DaySessionController from "../controller/daysession.controller.js";
import { Router } from "express";

const daySessionRouter = Router();

daySessionRouter.get(`/all`, DaySessionController.findAll)
daySessionRouter.get(`/fields`,DaySessionController.getColumnFieldNames)
daySessionRouter.get(`/pending`,DaySessionController.getPendings)
daySessionRouter.post(`/create`,DaySessionController.create)
daySessionRouter.patch(`/update`,DaySessionController.update)
daySessionRouter.get(`/:id`,DaySessionController.findByID)

export default daySessionRouter