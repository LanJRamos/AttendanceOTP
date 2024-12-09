import databaseConfig from '../../database.config.js'
import Address from './address.model.js'
import GenericModel from './generic.model.js'

export default class Holidays extends GenericModel{
    static fields = ["holidayID","holidayName","holidayDate"]
    constructor(holiday){
        super()
        this.holidayName = holiday.holidayName
        this.holidayDate = holiday.holidayDate ? new Date(holiday.holidayDate) : undefined
    }

    static async showHolidays(){
        try{
            const [HolidayList,fields] = await databaseConfig.query(`SELECT holidayName, holidayDate FROM ${this.tableName}`)
            return HolidayList
        }catch (error){
            throw(error)
        }
    }
    static async showFilteredHolidays(){
        try{
            let SpecialList = await databaseConfig.query(`SELECT holidayName, HolidayDate FROM ${this.tableName} WHERE holidayType = ?`,req.body.holidays.Type)
            return SpecialList
        }catch (error){
            throw (error)
        }
    }
    static async getMonthHolidayDate(){
        try {
            const [rows] = await databaseConfig.execute(`SELECT holidayName, holidayDate FROM holidays WHERE MONTH(holidayDate) = MONTH(NOW()) AND YEAR(holidayDate) = YEAR(NOW())`)
            return rows
        } catch (error) {
            throw(error)
        }
    }
}