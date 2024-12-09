import GenericModel from './generic.model.js'

export default class Logs extends GenericModel{
    static fields = ["logID","generatedBy","dateGenerated","changesDesc"]
    constructor(logs){
        super()
        this.generatedBy = logs.generatedBy
        this.changesDesc = logs.changesDesc
    }
}
