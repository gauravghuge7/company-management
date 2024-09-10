import mongoose from "mongoose";
import { Employee } from "../model/employee.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";




const getEmployeeDetails = asyncHandler(async (req, res) => {

   try {
   
      const { _id } = req.user;

      if( !_id) {
         throw new ApiError("User not found");
      }

      console.log("req.user => ", req.user)


      const employee = await Employee.aggregate([

         {
            $match: {
               admin: new mongoose.Types.ObjectId(_id),
            }
         },

         {
            $lookup: {
               from: "admins",
               localField: "admin",
               foreignField: "_id",
               as: "employees",
               
            }
         },
         {
            $project: {

               employeeName: 1,
               employeeEmail: 1,
               employeePassword: 1,
               designation: 1,
               admin: 1,
               isTeamLeader: 1,
               adminEmail: 1,
         
            },
         }

      ])

      console.log("employee => ", employee)


      return res
         .status(200)
         .json(
            new ApiResponse(200, "Employee details fetched successfully", employee)
         )



      
   } 
   catch (error) {
      
      console.log(" Error => ", error.message)
      throw new ApiError(400, error.message);
   }


})



export {
   getEmployeeDetails
}