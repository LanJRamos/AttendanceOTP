import {Router} from 'express'
import imgReceive from '../middleware/imgReceive.js'
import EmployeeController from '../controller/employee.controller.js'

const employeeRouter = Router()

employeeRouter.get(`/all`,EmployeeController.findAll)
employeeRouter.get(`/fields`,EmployeeController.getColumnNames)
employeeRouter.get(`/name`,EmployeeController.searchName)
employeeRouter.get(`/hours`,EmployeeController.getListData)
employeeRouter.get(`/:id`,EmployeeController.findByID)
employeeRouter.post(`/create`,imgReceive.single('profileImage'),EmployeeController.create)
employeeRouter.patch(`/update`,EmployeeController.update)

export default employeeRouter