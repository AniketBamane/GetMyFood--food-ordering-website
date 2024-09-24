import mongoose from "mongoose";

export default async function connectToDb(){
  try{
    console.log('Connecting to database ....');
    return await mongoose.connect(process.env.MONGO_URL);
  }catch(err){
    console.error('Failed to connect to the database', err.message);
    process.exit(1);
  }
}