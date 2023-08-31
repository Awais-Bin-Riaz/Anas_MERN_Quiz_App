import mongoose from "mongoose";

export default async function connect(){
    await mongoose.connect(process.env.Db)
    console.log("Database Connected")
}