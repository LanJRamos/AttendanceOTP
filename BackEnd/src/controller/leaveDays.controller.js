import LeaveDays from "../models/leaveDays.model.js";
import ExcuseReason from '../models/reason.model.js'
import databaseConfig from "../../database.config.js";

export default class LeaveDaysController{
    static async getAll(req,res,next){
        try {
            res.send(await LeaveDays.getAll())
        } catch (error) {
            next(error)
        }
    }
    static async getByID(req,res,next){
        try {
            res.send(await LeaveDays.getID(req.params.id))
        } catch (error) {
            next(error)
        }
    }
    static async getByEmployee(req,res,next){
        try {
            res.send(await LeaveDays.findByEmployee(req.params.id))
        } catch (error) {
            next(error)
        }
    }
    static async useDays(req,res,next){
        const conn = await databaseConfig.getConnection()
        const leaveDays = req.body.leaveDays
        try {
            conn.beginTransaction()
            const newReason = new ExcuseReason(req.body)
            newReason.create(conn).then(({insertId})=>{
                LeaveDays.assignLeaves(leaveDays.empID,leaveDays.id,insertId,leaveDays.dates,conn)
                .then(()=>LeaveDays.reduceDays(leaveDays.id,leaveDays.dates.length)
                .then(response=>{
                    conn.commit()
                    res.send(response)
                }))
            })
        } catch (error) {
            conn.rollback()
            next(error)
        }
        finally{
            conn.release()
        }
    }
}