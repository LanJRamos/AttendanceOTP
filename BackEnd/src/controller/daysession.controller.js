import DaySession from '../models/daysession.model.js'
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
            if((await Employee.findByID(req.body.daysession.employeeID)).length){
                const newDaySession = new DaySession(req.body.daysession)
                res.send(await newDaySession.create().catch(err=>next(err)))
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
}

