import Employee from '../models/employee.model.js'
import Leaves from '../models/leaves.model.js'

export default class LeavesController{

    static async findAll(req,res,next){
        res.send(await Leaves.getAll().catch(err=>next(err)))
    }
    static async findByID(req,res){
        res.send(await Leaves.getID(req.params.id).catch(err=>next(err)))
    }
    static async getFieldNames(req,res){
        res.send(await Leaves.getFields().catch(err=>next(err)))
    }
    static async create(req,res,next){
        try {
            const newLeaves = new Leaves(req.body.leaves)
            res.send(await newLeaves.create())
        } catch (error) {
            next(error)
        }
    }
    static async update(req,res,next){
        try {
            const updateLeaves = new Leaves(req.body.leaves)
            res.send(await updateLeaves.update())
        } catch (error) {
            next(error);
        }
    }
}