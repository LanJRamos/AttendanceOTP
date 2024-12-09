import databaseConfig from "../../database.config.js";
import GenericModel from "./generic.model.js";
import Leaves from "./leaves.model.js";

class LeaveDays extends GenericModel{
    constructor(leaveDays){
        this.leaveID = leaveDays.leaveID
        this.employeeID = leaveDays.employeeID
        this.daysLeft = leaveDays.daysLeft
        this.activeYear = leaveDays.activeYear
    }
    static async findByEmployee(id){
        const [rows] = await databaseConfig.execute(`SELECT leaveID, leaveDaysID, daysLeft FROM leaveDays WHERE employeeID = ? AND YEAR(activeYear) = YEAR(CURDATE())`,[id])
        return rows
    }
    static async createDefault(id,conn){
        const dbConn = conn || databaseConfig
        const response = await Leaves.getAll()
        let sql = `INSERT INTO leavedays(leaveID, employeeID, activeYear, daysLeft) VALUES`
        sql += response.map(row=>`(${row.leavesID}, ${id}, CURDATE(), ${row.defaultDays})`).join(',')
        return await dbConn.query(sql)
    }
    static async assignLeaves(empID,leaveDaysID,reasonID,dates,conn){
        try {
            const dbConn = conn || databaseConfig
            const placeholder = dates.map(()=>`(?,?,?,?)`).join(',')
            const values = dates.map(date=>[empID,leaveDaysID,reasonID,new Date(date)])
            //does not consider if another leave exists on the same day
            return dbConn.execute(`INSERT INTO shift (employeeID, leaveDaysID, reasonID, shiftDate) VALUES
            ${placeholder} ON DUPLICATE KEY UPDATE leaveDaysID = VALUES(leaveDaysID)`,values.flat())
        } catch (error) {
            throw(error)
        }
    }
    static async reduceDays(id,days,conn){
        try {
            const dbConn = conn || databaseConfig
            return await dbConn.execute(`UPDATE leaveDays SET daysLeft = (daysLeft - ?) WHERE leaveDaysID = ?`,[days,id])
        } catch (error) {
            throw(error)
        }
    }
}

export default LeaveDays