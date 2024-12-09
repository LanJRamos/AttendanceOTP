import databaseConn from '../../database.config.js'

/**
 * @class
 * @exports
 * @description Contains the core methods of the data models. Has the basic methods such as:
 * - Select All
 * - Select by ID
 * - Get Column Names
 * - Create
 * - Update
 */
export default class GenericModel{
    constructor(){
        this.tableName = this.constructor.name.toLowerCase()
    }
    static async getID(id){
        try {
            const [rows] = await databaseConn.execute(`SELECT * FROM ${this.tableName} WHERE ${this.fields[0]} = ?`,[String(id)])
            return rows
        } catch (error) {
            throw(error)
        }
    }
    static async getAll(){
        try {
            const [rows,fields] = await databaseConn.query(`SELECT * FROM ${this.tableName}`)
            return rows
        } catch (error) {
            throw(error)
        }
    }
    static async getFields(){
        try {
            let [rows,fields] = await databaseConn.execute(`SELECT * FROM ${this.tableName}`)
            return fields.map(field=>field.name)
        } catch (error) {
            throw(error)
        }
    }
    async create(dbconn){
        try {
            //Remove databaseConn after implementing transaction to all
            const conn = dbconn || databaseConn
            const fields = {}
            for (const key in this) if (this[key] && key !== `tableName`) fields[key] = this[key];
            const [response] = await conn.execute(`INSERT INTO ${this.tableName} SET ${Object.keys(fields).map(field=>`${field} = ?`)}`,Object.values(fields))
            return response
        } catch (error) {
            throw(error)
        }
    }
    async update(id){
        try {
            const fields = {}
            for (const key in this) if (this[key] !== undefined && key !== `tableName`) fields[key] = this[key];
            const [response] = await databaseConn.query(`UPDATE ${this.tableName} SET ? WHERE ? = ?`,[fields,id,Object.values(fields)[0]])
            return response
        } catch (error) {
            throw(error)
        }
    }
    static async getLastID(){
        try {
            const [rows,fields] = await databaseConn.execute(`SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = "attendancemgmtsys" AND TABLE_NAME = "${this.tableName}"`)
            const {AUTO_INCREMENT} = rows[0]
            return AUTO_INCREMENT
        } catch (error) {
            throw(error)
        }
    }
    static get tableName(){
        return this.name.toLowerCase()
    }
}