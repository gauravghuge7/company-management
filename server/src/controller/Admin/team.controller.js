import mongoose from "mongoose";

import { uploadOnCloudinary } from "../../helper/cloudinary.js";
import { Admin } from "../../model/admin.model.js";
import { Employee } from "../../model/employee.model.js";
import { Team } from "../../model/team.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";



const createTeams = asyncHandler(async (req, res) => {

   try {

       // accept the data from the body 
       // console.log("req.body => ", req.body)



       const {teamName, teamLead, projectId, employee, teamId} = req.body;

       // validate the data
       
       if(!teamName || !teamLead || !projectId || !employee) {
           throw new ApiError(400, "Please provide all the required fields");
       }

       // check if the team already exists
       
       const existedTeam = await Team.findOne({ teamId })
       
       if(existedTeam) {
           throw new ApiError(400, "Team already exists");
       }


       /// find the team lead in Employee document
       /// get the mongoDB id of the team lead


       const teamLeadId = await Employee.findOne({employeeName: teamLead})

       console.log("teamLeadId => ", teamLeadId)

       if(!teamLeadId) {
           throw new ApiError(400, "Team lead does not exist");
       }

       
       const employeeId = await Employee.find({employeeName: employee})

       console.log("employeeId => ", employeeId)

       if(employeeId.length < 1 ) {
           throw new ApiError(400, "you are note selected any employee");
       }
       

       

       // create a entry in the database 
       
       const team = await Team.create({
           teamName,
           teamLead: teamLeadId._id,
           projectId,
           employee: employeeId.map(data => data._id),
           teamId,
           admin: req.user._id
       })

       team.save({validateBeforeSave: false});

       return res  
           .status(200)
           .json(
               new ApiResponse(200, "Team created successfully", team)
           )

       
   } 
   catch (error) {
       console.log(" Error => ", error.message)
       throw new ApiError(400, error.message);
   }

})



const getAllTeams = async(req, res) => {

   try {


       const team = await Team.aggregate([

           {
               $match: {
                   admin: new mongoose.Types.ObjectId(req.user._id)
               }
           },

           {
               $lookup: {
                   from: "employees",
                   localField: "teamLead",
                   foreignField: "_id",
                   as: "teamLead",
               }
           },

           {
               $lookup: {
                   from: "employees",
                   localField: "employee",
                   foreignField: "_id",
                   as: "employees",

               }
           },

           

                // Preserve the entire teamLead array as is
           {
               $unwind: {
                   path: "$teamLead",
                   preserveNullAndEmptyArrays: true
               }
           },

           // $addFields to include the teamLeadName and employees array
           {
               $addFields: {
                   teamLead: "$teamLead.employeeName",
                   employee: "$employees.employeeName",
                   teamLeadEmail: "$teamLead.employeeEmail",
                   employeesEmail: "$employees.employeeEmail"

               }
           },

           {
               $project: {
                   teamName: 1,
                   teamId: 1,
                   
                   teamLeadEmail: 1,
                   employeesEmail: 1,
                   teamLead: 1,
                   employee: 1,
                   
               }
           }

       ])


       const teamList = await Team.find({admin: req.user._id}).populate("employee")

       // console.log("teamList => ", teamList);

       teamList.map(data => {
           console.log(data.employee);
       }) 


       return res
       .status(200)
       .json(
           new ApiResponse(
               200, 
               "Total teams fetched successfully", 
               {
                   team
               }
           )
       )
       
   } 


   catch (error) {
       console.log(" Error => ", error.message)
       throw new ApiError(400, error.message);
   }


}



export {
    createTeams,
    getAllTeams,
}

