import GenericModel from './generic.model.js'

export default class ExcuseReason extends GenericModel{
    static fields = ["reasonID","reason"]
    constructor(reason){
        super()
        this.reason = reason.reason
    }
}