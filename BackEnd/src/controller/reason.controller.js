import DaySession from '../models/daysession.model.js'
import ExcuseReason from '../models/reason.model.js'

export default class ReasonController{
    static async findAll(req,res,next){
        res.send(await ExcuseReason.getAll().catch(err=>next(err)))
    }
    static async findByID(req,res){
        res.send(await ExcuseReason.getID(req.params.id).catch(err=>next(err)))
    }
    static async getFieldNames(req,res){
        res.send(await ExcuseReason.getFields().catch(err=>next(err)))
    }
    static async create(req,res,next){
        try {
            if((await DaySession.getID(req.body.reason.sessionID)).length){
                const newReason = new ExcuseReason(req.body.reason)
                res.send(await newReason.create())
            } else throw Error(`Session ID does not exist`)
        } catch (error) {
            next(error)
        }
    }
    static async update(req,res,next){
        try {
            const updateReason = new ExcuseReason(req.body.reason)
            res.send(await updateReason.update())
        } catch (error) {
            next(error);
        }
    }
}
