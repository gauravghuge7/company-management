import bcrypt
  from 'bcrypt';                 // this is the password bcrypt library for hashung the password
import jwt
  from 'jsonwebtoken';   //using the jwt token for the access and refresh token
import mongoose from 'mongoose';

import { uploadOnCloudinary } from '../../helper/cloudinary.js';
import { Admin } from '../../model/admin.model.js';
import { Client } from '../../model/client.model.js';
import { Employee } from '../../model/employee.model.js';
import { Project } from '../../model/project.model.js';
import { Team } from '../../model/team.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';





const editEmployee = asyncHandler(async(req, res) => {
   
   try {

      console.log("req.body => ", req.body);

      const {_id, employeeName, employeeEmail, designation } = req.body;


      if(!_id || !employeeName || !employeeEmail || !designation) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      // check if the employee already exists
      
      const existedEmployee = await Employee.findOne({ _id })
      
      if(!existedEmployee) {
         throw new ApiError(400, "Employee does not exist");
      }

      // update the entry in the database 
      
      const employee = await Employee.findByIdAndUpdate(_id, {
         employeeName,
         employeeEmail,
         designation
      })
      
      return res.status(200).json(                                           // 
         new ApiResponse(200, "Employee updated successfully", employee)
      )
   
   }
   catch (error) {
      console.log(" Error => ", error.message)
      throw new ApiError(400, error.message);    
   }

})




const deleteEmployee = asyncHandler(async(req, res) => {
   
   try {

      console.log("req.query => ", req.query);
      console.log("req.params => ", req.params);

      const {employeeId} = req.params;

      if(!employeeId) {
         throw new ApiError(400, "Please provide the employee id");
      }

      // find the entry in the database
      
      const employee = await Employee.findById(employeeId);
      
      if(!employee) {
         throw new ApiError(400, "Employee does not exist");
      }
      
      // delete the entry in the database 
      
      await Employee.findByIdAndDelete(employeeId);
      
      return res.status(200).json(                                           // 
         new ApiResponse(200, "Employee deleted successfully", employee)
      )
   
   }
   catch (error) {
      console.log(" Error => ", error.message)
      throw new ApiError(400, error.message);    
   }

})



const getTeamLeadOrNot = asyncHandler(async(req, res) => {

   try {

       const {_id} = req.user;
       
       if(!_id) {
           throw new ApiError(400, "Please provide the employee email");
       }
       
       
       // find the entry in the database
       
       const employee = await Employee.findById(_id);
       
       if(!employee) {
           throw new ApiError(400, "Employee does not exist");
       }

       // find the entry in a team as the teamLead
       
       const teamLead = await Team.find({teamLead: employee._id})
       
       if(teamLead.length === 0) {
           
           return res
               .status(200)
               .json(
                   new ApiResponse(200, "Employee Teams fetched successfully", [])
               )
       }
       
       // return the response 
       return res
           .status(200)
           .json(
               new ApiResponse(200, "Employee Projects fetched successfully", teamLead)
           )

       
   } 
   catch (error) {
       console.log(" Error => ", error.message)
       throw new ApiError(400, error.message);
   }

})




export {
   editEmployee,
   deleteEmployee,
   getTeamLeadOrNot,
};