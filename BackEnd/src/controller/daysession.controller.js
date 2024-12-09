import DaySession from '../models/daySession.model.js'
import Employee from '../models/employee.model.js'

export default class DaySessionController{
    
    static async findAll(req,res,next){
        res.send(await DaySession.getAll().catch(err=>next(err)))
    }
    static async findByID(req,res){
        res.send(await DaySession.getID(req.params.id).catch(err=>next(err)))
    }
    static async getColumnFieldNames(req,res){
        res.send(await DaySession.getFields().catch(err=>next(err)))
    }
    static async create(req,res,next){
        try {
            if((await Employee.getID(req.body.daysession.employeeID)).length){
                const newDaySession = new DaySession(req.body.daysession)
                let response
                if(newDaySession.timeIn){
                    response = await newDaySession.setTimeIn()
                }else{
                    response = await newDaySession.setTimeOut()
                }
                res.send(response)
            }else throw Error(`Employee ID does not exist`)
        } catch (error) {
            next(error)
        }
    }
    static async update(req,res,next){
        try {
            const updateDaySession = new DaySession(req.body.daysession)
            res.send(await updateDaySession.update())
        } catch (error) {
            next(error)
        }
    }
    static async getPendings(req,res,next){
        try {
            res.send(await DaySession.getUnresolvedStatus())
        } catch (error) {
            next(error)
        }
    }
}

