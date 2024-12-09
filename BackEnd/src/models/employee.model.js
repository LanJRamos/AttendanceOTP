import GenericModel from './generic.model.js'
import databaseConfig from '../../database.config.js'

export default class Employee extends GenericModel{
    static fields = [
        "employeeID",
        "firstName",
        "middleName",
        "lastName",
        "gender",
        "civilStatus",
        "addressID",
        "birthDate",
        "jobPosition",
        "currentStatus",
        "contactNumber",
        "email",
        "imageDir"
    ]
    constructor(employee){
        super()
        this.firstName = employee.firstName
        this.middleName = employee.middleName
        this.lastName = employee.lastName
        this.gender = employee.gender
        this.civilStatus = employee.civilStatus
        this.addressID = employee.addressID
        this.birthDate = employee.birthDate ? new Date(employee.birthDate) : undefined
        this.jobPosition = employee.jobPosition
        this.currentStatus = employee.currentStatus
        this.contactNumber = employee.contactNumber
        this.email = employee.email
    }
    static async checkEmail(email){
        try {
            const [rows] = await databaseConfig.execute(`SELECT employeeID FROM employee WHERE email = ? LIMIT 1`,[email])
            return rows
        } catch (error) {
            throw(error)
        }
    }
    static async getEmployeeList(){
        try {
            const [rows] = await databaseConfig.execute(`SELECT employeeID, 
            CONCAT_WS(' ',firstName, IFNULL(LEFT(middleName, 1),''), lastName) AS fullName 
            FROM employee ORDER BY fullName`)
            return rows
        } catch (error) {
            throw(error)
        }
    }
    static async fuzzySearch(string){
        try {
            string = `%${string}%`
            const [rows] = await databaseConfig.execute(`SELECT employeeID, 
            CONCAT_WS(' ',firstName, IFNULL(LEFT(middleName, 1),''), lastName) AS fullName 
            FROM employee WHERE firstName LIKE ? OR lastName LIKE ? OR middleName LIKE ? ORDER BY fullName`,[string,string,string])
            return rows
        } catch (error) {
            throw(error)
        }
    }
}