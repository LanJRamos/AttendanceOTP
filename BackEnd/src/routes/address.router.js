import { Router } from "express";
import AddressController from "../controller/address.controller.js";

const addressRouter = Router()

addressRouter.get('/all',AddressController.findAll)
addressRouter.get('/fields',AddressController.getFieldNames)
addressRouter.get('/:id',AddressController.findByID)
addressRouter.post('/create',AddressController.create)
addressRouter.patch('/update',AddressController.update)

export default addressRouter

