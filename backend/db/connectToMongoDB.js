import mongoose from "mongoose";

const connctToMongoDB = async ()=>{
    try{
await mongoose.connect(process.env.Mongo_DB_URI)
console.log("connected to MongoDB")
    }catch(error){
        console.log("Error connecting to MongoDB" , error.message)
    }
}

export default connctToMongoDB;