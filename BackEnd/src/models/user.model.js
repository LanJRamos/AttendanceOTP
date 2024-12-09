import bcrypt from 'bcrypt'
import GenericModel from './generic.model.js'
import databaseConfig from '../../database.config.js'

export default class User extends GenericModel{
    static fields = ["userID","employeeID","userPassword","position","lastLogin"]
    constructor(user){
        super()
        this.employeeID = user.employeeID
        this.userPassword = user.userPassword
        this.position = user.position
        this.lastLogin = user.lastLogin
    }
    async verifyLogin(email){
        const [rows] = await databaseConfig.execute(`SELECT userID, userPassword FROM user AS u JOIN employee AS e ON u.employeeID = e.employeeID WHERE e.email = ?`, [email])
        if(rows.length && await this.comparePassword(rows[0].userPassword)){
            return {authentication: true, userID: rows[0].userID}
        }else return {authentication: false}
    }
    async hashPassword(){
        this.userPassword = await bcrypt.hash(this.userPassword,await bcrypt.genSalt())
    }
    async comparePassword(hashedPass){
        return await bcrypt.compare(this.userPassword,hashedPass)
    }
    static async getPosition(id){
        return await databaseConfig.execute(`SELECT position FROM user WHERE userID = ?`,[id])
    }
}