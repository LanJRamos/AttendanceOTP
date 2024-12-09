import GenericModel from './generic.model.js'
import databaseConfig from '../../database.config.js'

export default class DaySession extends GenericModel{
    static fields = ["sessionID","employeeID","reasonID","timeIn","timeOut","dayStatus"]
    constructor(daysession){
        super()
        if(!daysession.employeeID) throw Error('Missing dependency: employeeID')
        this.employeeID = daysession.employeeID
        this.reasonID = daysession.reasonID ?? null
        this.timeIn = daysession.timeIn ?? null
        this.timeOut = daysession.timeOut ?? null
        this.dayStatus = daysession.dayStatus ?? null
    }
    static async getAbsentsAndLates(){
        try {
            const [rows] = await databaseConfig.execute(`SELECT d.sessionID, s.shiftDate, e.employeeID,
            IF(d.dayStatus = 'late','late','absent') AS dayStatus,
            CONCAT_WS(' ',e.firstName, IFNULL(LEFT(e.middleName, 1),''), e.lastName) AS fullName,
            d.timeIn FROM shift as s JOIN employee as e ON s.employeeID = e.employeeID LEFT JOIN daysession as d
            ON s.employeeID = d.employeeID AND s.shiftDate = DATE(d.timeIn) WHERE (DATE(d.timeIn) IS NULL 
            AND s.shiftDate < CURDATE()) OR d.dayStatus = 'late' OR d.dayStatus = 'absent'`)
            return rows
        } catch (error) {
            throw(error)
        }
    }
    static async getUnresolvedStatus(){
        try {
            const [rows] = await databaseConfig.execute(`SELECT s.sessionID, e.employeeID,
            CONCAT_WS(' ',e.firstName, IFNULL(LEFT(e.middleName, 1),''), e.lastName) AS fullName,
            s.timeIn FROM daysession as s JOIN employee as e ON s.employeeID = e.employeeID
            WHERE dayStatus = 'pending' AND DATE(timeIn) < CURDATE()`)
            return rows
        } catch (error) {
            throw(error)
        }
    }
    async setTimeIn(){
        const temp = await databaseConfig.getConnection()
        try {
            const fields = Object.keys(this).filter(key=>this[key]).slice(1)
            const values = Object.values(this).filter(prop=>prop).slice(1)
            const valuesPH = values.map(a=>`?`).join(',')
            let response
            temp.beginTransaction()
            const existQuery = `
                SELECT CASE 
                WHEN EXISTS(SELECT 1 FROM shift WHERE employeeID = ? AND shiftDate = CURDATE())
                AND NOT EXISTS(SELECT 1 FROM daysession WHERE DATE(timeIn) = CURDATE() AND employeeID = ? AND timeOut is NULL)
                THEN 'Proceed'
                ELSE 'Halt'
                END AS exist
            `
            if((await temp.execute(existQuery,[this.employeeID,this.employeeID]))[0][0].exist === 'Proceed'){
                response = await temp.execute(`INSERT INTO daySession (${fields}) VALUES(${valuesPH})`,values)
                temp.commit()
                temp.release()
            }else{
                response = "There is no shift/timeout for this employee today"
            }
            return response
        } catch (error) {
            temp.rollback()
            throw(error)
        } finally{
            temp.release()
        }
    }
    async setTimeOut(){
        const temp = await databaseConfig.getConnection()
        try {
            const timeOutDate = this.timeOut ?? new Date()
            console.log(timeOutDate)
            let response
            temp.beginTransaction()
            const [rows] = await temp.execute(`SELECT sessionid FROM daysession WHERE employeeID = ? AND DATE(timeIn) = CURDATE() AND timeIn is not null AND timeOut is null`,[this.employeeID])
            if(rows.length){
                response = await temp.execute('UPDATE daySession SET timeOut = ?, dayStatus = "present" WHERE employeeID = ? AND DATE(timeIn) = CURDATE() AND timeOut is null',[timeOutDate,this.employeeID])
                console.log(response)
                temp.commit()
                temp.release()
            }else{
                response = "No time in found for today"
            }
            return response
        } catch (error) {
            temp.rollback()
            throw(error)
        } finally{
            temp.release()
        }
    }
    static async getEmpDayWorkHours(empID,date){
        date = date || new Date()
        const values = empID ? [date,empID] : [date]
        const idSQL = empID ? 'AND employeeID = ? ' : ''
        console.log(values,idSQL,empID ? true : false)
        const [rows] = await databaseConfig.execute(`SELECT employeeID, SUM(TIMESTAMPDIFF(HOUR,timeIn,timeOut)) AS hoursWorked, 
            SUM(GREATEST(0, TIMESTAMPDIFF(HOUR,timeIn,timeOut) - 8)) AS hoursOvertime
            FROM daysession WHERE 
            DATE(timeIn) = ? ${idSQL}GROUP BY timeIn`,values)
        return rows
    }
    static async getEmpWeekWorkHours(empID,date){
        date = date || new Date()
        const values = empID ? [date,date,empID] : [date,date]
        const idSQL = empID ? 'AND employeeID = ? ' : ''
        const [rows] = await databaseConfig.execute(`SELECT employeeID, SUM(TIMESTAMPDIFF(HOUR,timeIn,timeOut)) AS hoursWorked,
            SUM(GREATEST(0, TIMESTAMPDIFF(HOUR,timeIn,timeOut) - 8)) AS hoursOvertime 
            FROM daysession WHERE 
            WEEK(timeIn) = WEEK(?) AND YEAR(timeIn) = YEAR(?) ${idSQL}GROUP BY WEEK(timeIn)`,values)
        return rows
    }
    static async getEmpMonthWorkHours(empID,date){
        date = date || new Date()
        const values = empID ? [date,date,empID] : [date,date]
        const idSQL = empID ? 'AND employeeID = ? ' : ''
        const [rows] = await databaseConfig.execute(`SELECT employeeID, SUM(TIMESTAMPDIFF(HOUR,timeIn,timeOut)) AS hoursWorked,
            SUM(GREATEST(0, TIMESTAMPDIFF(HOUR,timeIn,timeOut) - 8)) AS hoursOvertime
            FROM daysession WHERE 
            MONTH(timeIn) = MONTH(?) AND YEAR(timeIn) = YEAR(?) ${idSQL}GROUP BY employeeID`,values)
        return rows
    }
}