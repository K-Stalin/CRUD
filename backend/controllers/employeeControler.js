import Employee from "../models/employeeModel.js";
import asyncHandler from "express-async-handler"


// CreateEmployee
const createEmployee =asyncHandler( async(req,res,next)=>{
     const {firstName ,lastName , email ,phone ,location,salary} = req.body;

    if( !firstName || !lastName || !email || !phone || !location || !salary)
    {
         res.status(400);
         return next(new Error("Please provide firstName,lastName,email,phone,location and salary"))
    }

     try {
        // Check if user already exists
        const userExists = await Employee.findOne({email})
        if(userExists)
            {
                res.status(400)
                return next(new Error(
                    "Email is already registered , please use different email"
                ))
            }  
       // create new user
       const employee = await Employee.create({firstName,lastName,email,phone,location,salary})
       if(employee)
       {
         return res.status(201).json({
             _id:employee._id,
             firstName:employee.firstName,
             lastName:employee.lastName,
             email:employee.email,
             phone:employee.phone,
             location:employee.location,
             salary:employee.salary
         })
       }
     } catch (error) {
        next(error)
     }
} )


// Read
const readEmployee =asyncHandler(async(req,res)=>{
          const employee = await Employee.find();
          res.status(201).json(employee)  
})


//Update

const updateEmployee = asyncHandler(async(req,res)=>{     
     const updateEmployee =  await Employee.findByIdAndUpdate(req.params.id,req.body,{new : true })
      if(updateEmployee)
      {
        res.status(201).json(updateEmployee)
      }else
      {
        res.status(404)
        throw new Error("User not found");
      }

})


//Delete
const deleteEmployee  = asyncHandler(async(req,res)=>{
     const deleteEmployee =  await Employee.findByIdAndDelete(req.params.id)
    if(deleteEmployee)
        {
           res.status(200).json("Employee Deleted")
        }else
        {
          res.status(404)
          throw new Error("User not found")
        }      
})


export { createEmployee , readEmployee , updateEmployee , deleteEmployee }