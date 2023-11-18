import databaseConn from '../../database.config.js'
import GenericModel from './generic.model.js'

export default class DaySession extends GenericModel{
    static tableName = 'daysession'
    static fields = ["sessionID","employeeID","timeIn","timeOut","dayStatus"]
    constructor(daySession){
        this.sessionID = daySession.sessionID
        this.employeeID = daySession.employeeID
        this.timeIn = daySession.timeIn
        this.timeOut = daySession.timeOut
        this.dayStatus = daySession.dayStatus
    }
}