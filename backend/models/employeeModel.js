import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
     firstName:{
         type:String,
         required:true
     },
     lastName:{
         type:String,
         required:true
     },
     email:{
         type:String,
         required:true,
         unique:true
     },
     phone:{
        type:Number,
        required:true
     },
     location:{
        type:String,
        required:true
     },
     salary:{
        type:Number,
        required:true
     }
})


const Employee = mongoose.model("Employee",employeeSchema)

export default Employee;