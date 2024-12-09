import Holidays from '../models/holidays.model.js'

export default class HolidaysController{
    static async findAll(req,res,next){
        res.send(await Holidays.getAll().catch(err=>next(err)))
    }
    static async findByID(req,res){
        res.send(await Holidays.getID(req.params.id).catch(err=>next(err)))
    }
    static async getFieldNames(req,res){
        res.send(await Holidays.getFields().catch(err=>next(err)))
    }
    static async create(req,res,next){
        try {
            const newHolidays = new Holidays(req.body.holidays)
            res.send(await newHolidays.create())
        } catch (error) {
            next(error)
        }
    }
    static async update(req,res,next){
        try {
            const updateHolidays = new Holidays(req.body.holidays)
            res.send(await updateHolidays.update())
        } catch (error) {
            next(error);
        }
    }

    static async showAllHolidays(req,res,next){
        res.send(await Holidays.showHolidays().catch(err=>next(err)))
    }
    
    static async showFilteredHolidays(req,res,next){
         
    }

    static async getMonthDates(req,res,next){
        try {
             res.send(await Holidays.getMonthHolidayDate())
        } catch (error) {
            next(error)
        }
    }
}