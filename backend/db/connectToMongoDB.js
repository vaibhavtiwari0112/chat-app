import mongoose from "mongoose";

const connectToMongoDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    const JWT_SECRET = process.env.JWT_SECRET;

    try {
        await mongoose.connect(MONGODB_URI, {
           
         
           // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: false
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};

export default connectToMongoDB;
