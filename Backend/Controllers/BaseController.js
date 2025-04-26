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

    // Function to fetch a row and all related data
    async fetchRowWithRelations(request, result) {
        try {
            const rowId = request.params.id;
    
            // Fetch main row
            const { data: mainRow, error: mainError } = await db
                .from(this.tableName)
                .select('*')
                .eq('id', rowId)
                .single();
    
            if (mainError) throw mainError;
            if (!mainRow) return result.status(404).json({ error: "not found" });
    
            // Fetch foreign key relations
            const { data: relations, error: relError } = await db
                .rpc('get_table_relations', { target_table: this.tableName });
    
            if (relError) throw relError;
    
            // Add related data as nested properties
            for (const relation of relations) {
                const foreignKeyValue = mainRow[relation.local_column];
                if (foreignKeyValue === undefined || foreignKeyValue === null) continue;
    
                const { data, error } = await db
                    .from(relation.foreign_table)
                    .select('*')
                    .eq(relation.foreign_column, mainRow[relation.local_column])
                    .single(); // assume 1:1 relationship
    
                if (!error) {
                    mainRow[relation.foreign_table] = data;
                }
            }
    
            return result.json(mainRow);
        } catch (error) {
            console.error('Fetch row with relations error:', error);
            return result.status(500).json({ error: error.message });
        }
    }    
}

module.exports = BaseController;