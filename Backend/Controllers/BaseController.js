const db = require("../Configurations/db");

class BaseController {
    constructor(tableName)
    {
        this.tableName = tableName;
    }
    
    //create entry
    async create (request,result){
     const {data, error} = await db.from(this.tableName).insert(request.body);
     if(error) return result.json({error : error.message});
     result.status(201).json(data);   
    }

    //get all entries
    async getAll(request , result){
        const {data, error} = await db.from(this.tableName).select("*");
        if (error) return result.status(500).json({error: error.message});
        result.json(data);
    }

    //get single entry
    async getOne (request, result){
        const {data, error} = await db.from(this.tableName).select("*").eq("id", request.params.id).single();
        if(error) return result.json({error: "not found"});
        result.json(data);
    }

    //update entries
    async update(request,result)
    {
        const {data,error} = await db.from(this.tableName).update(request.body).eq("id",request.params.id).select();
        if (error) return result.json({error: error.message});
        result.json(data);
    }

    //delete entries
    async delete (request,result) {
        const {data, error} = await db.from(this.tableName).delete().eq("id", request.params.id);
        if(error) return result.json({error : error.message});
        result.json({message: "delete"})
    }
}

module.exports = BaseController;