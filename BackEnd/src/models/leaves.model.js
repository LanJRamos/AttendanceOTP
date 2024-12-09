import GenericModel from './generic.model.js'
import databaseConfig from '../../database.config.js'

export default class Leaves extends GenericModel{
    static fields = ["leaveID","employeeID","leaveName","daysLeft"]
    constructor(leaves){
        super()
        this.employeeID = leaves.employeeID
        this.leaveName = leaves.leaveName
        this.daysLeft = leaves.daysLeft
    }
}
