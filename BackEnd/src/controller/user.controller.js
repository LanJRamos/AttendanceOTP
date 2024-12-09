import Employee from '../models/employee.model.js'
import User from '../models/user.model.js'

export default class UserController{
    static async findAll(req,res,next){
        res.send(await User.getAll().catch(err=>next(err)))
    }
    static async findByID(req,res,next){
        res.send(await User.getID(req.params.id).catch(err=>next(err)))
    }
    static async getFieldNames(req,res){
        res.send(await User.getFields().catch(err=>next(err)))
    }
    static async create(req,res,next){
        try {
            let email
            if(req.body.employee){
                const newEmployee = new Employee(req.body.employee)
                newEmployee.create()
                .then(async response=>{
                    const newUser = new User(req.body.user)
                    req.body.user.employeeID = response.insertID
                    await newUser.encryptPassword()
                    res.send(await newUser.create())
                })
            }
            else if((email = await Employee.checkEmail(req.body.email)).length){
                const newUser = new User(req.body)
                newUser.employeeID = email[0].employeeID
                await newUser.hashPassword()
                res.send(await newUser.create())
            }
            else throw Error(`Employee does not exist`)
        } catch (error){
            next(error)
        }
    }
    static async update(req,res,next){
        try {
            const updateUser = new User(req.body.user)
            res.send(await updateUser.update())
        } catch (error) {
            next(error);
        }
    }
    static async login(req,res,next){
        try {
            req.body.userPassword = req.body.password
            const user = new User(req.body)
            const result = await user.verifyLogin(req.body.email)
            if(result.authentication) req.session.userID = result.userID
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
    static async authorize(req,res,next){
        try {
            res.send(req.session?.userID ? {valid: true, position: ((await User.getPosition(req.session.userID))[0][0].position)} : {valid : false})
        } catch (error) {
            next(error)
        }
    }
    static logout(req,res,next){
        try {
            req.session = null
            res.send({message: "Log Out Complete"})
        } catch (error) {
            next(error)
        }
    }
}