import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/employeeRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cors from "cors"


connectDB()
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use("/api/employee",router)

// Middleware
app.use(notFound)
app.use(errorHandler)
app.listen(4000,()=>{
     console.log("http://localhost:4000")
})

