import Logs from '../models/logs.model.js'
import User from '../models/user.model.js'

export default class LogsController{
    static async findAll(req,res,next){
        res.send(await Logs.getAll().catch(err=>next(err)))
    }
    static async findByID(req,res){
        res.send(await Logs.getID(req.params.id).catch(err=>next(err)))
    }
    static async getFieldNames(req,res){
        res.send(await Logs.getFields().catch(err=>next(err)))
    }
    static async create(req,res,next){
        try {
            if((await User.getID(req.body.logs.generatedBy)).length){
                const newLogs = new Logs(req.body.logs)
                res.send(await newLogs.create())
            } else throw Error(`User ID does not exist`)
        } catch (error) {
            next(error)
        }
    }
    static async update(req,res,next){
        try {
            const updateLogs = new Logs(req.body.logs)
            res.send(await updateLogs.update())
        } catch (error) {
            next(error);
        }
    }
}