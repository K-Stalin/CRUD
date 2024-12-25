import mongoose from "mongoose";

const connectDB = async ()=>{
     try {
          const connect = await mongoose.connect(
            "mongodb+srv://stalinkumanan:aVHsBkBpA6ljthj9@databasemanagement.wj7rk.mongodb.net/"
          );
          console.log("MONGODB Connected SuccessFuly!")
     } catch (error) {
        console.log(error)
        process.exit(1) // Terminate the process 
     }
}

export default connectDB;

// aVHsBkBpA6ljthj9;
// stalinkumanan;