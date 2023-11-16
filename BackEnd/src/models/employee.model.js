import dbConn from './db.config.js'

class Employee{
    constructor(employee){
        this.employeeID = employee.employeeID;
        this.firstName = employee.firstName;
        this.middleName = employee.middleName;
        this.lastName = employee.lastName;
        this.birthdate = employee.birthDate;
        this.address = employee.address;
        this.position = employee.jobPosition;
        this.status = employee.currentStatus
        this.contactNumber = employee.contactNumber
        this.email = employee.email;
    }
}

module.exports = Employee