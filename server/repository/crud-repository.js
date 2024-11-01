class CrudRepository {
    constructor(model){
        this.model = model;
    }

    async create(data){
        console.log(data);
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            
            console.log(error)
            console.log("Something went wrong in the crud repository layer");
            throw error;
        }
    }

    async destroyById(id){
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log("Something went wrong in the crud repository layer");
            throw error;
        }
    }

    async getById(id){
        try {
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            console.log("Something went wrong in the crud repository layer");
            throw error;
        }
    }

    async getAll(){
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            console.log("Something went wrong in the crud repository layer");
            throw error;
        }
    }

    async update(id,data){
        try {
            const result = await this.model.findByIdAndUpdate(id,data,{new:true});
            return result;
        } catch (error) {
            console.log(error)
            console.log("Something went wrong in the crud repository layer");
            throw error;
        }
    }
}


export default  CrudRepository;