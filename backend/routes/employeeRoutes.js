import { createEmployee, deleteEmployee, readEmployee, updateEmployee } from "../controllers/employeeControler.js";
import express from "express";



const router = express.Router();


router.post("/",createEmployee)
router.get("/",readEmployee)
router.put("/:id",updateEmployee)
router.delete("/:id",deleteEmployee)


export default router;
