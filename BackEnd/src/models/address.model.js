import GenericModel from "./generic.model.js";

export default class Address extends GenericModel{
    static fields = ["addressID","street","barangay","postalCode","city_municipality","province"]
    constructor(address){
        super()
        this.street = address.street
        this.barangay = address.barangay
        this.postalCode = address.postalCode
        this.city_municipality = address.city_municipality
        this.province = address.province
    }
}
