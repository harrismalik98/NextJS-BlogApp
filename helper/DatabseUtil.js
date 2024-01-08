import mongoose from "mongoose";

export const connectDB = async() => {
    try
    {
        mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("MongoDB Connected");
    }
    catch(error)
    {
        console.error("MongoDB connection error:", error);
        throw new Error("Database connection failed! Please try again.");
    }
};

export const insertDocument = async (collect, doc) => {
    try
    {
        await connectDB();
        const db = mongoose.connection;
        const collection = db.collection(collect);
        const result = await collection.insertOne(doc);
        return result;
    }
    catch(error)
    {
        console.error("Failed to add data to the database.", error);
        throw new Error("Failed to add data to the database. Please try again.");
    }
}