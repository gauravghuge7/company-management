
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import mongoose from "mongoose";
import {Project } from "../../model/project.model.js";


const getTeamLeadProjects = asyncHandler(async(req, res) => {





   try {

   const projects = await Team.aggregate([
         {
               $match: {
               teamLead: new mongoose.Types.ObjectId(req.user._id)
               }
         },
         {
               $lookup: {
               from: "projects",
               localField: "_id",
               foreignField: "team",
               as: "projects"
               }
         },
         {
               $unwind: {
               path: "$projects",
               preserveNullAndEmptyArrays: true // This will handle teams without projects
               }
         },
         {
               $project: {
               _id: 0, // Optionally exclude the _id if not needed
               projectName: "$projects.projectName",
               projectId: "$projects._id",
               clientName: "$projects.clientName",
               teamId: "$_id" // Including teamId for reference
               }
         },
         {
               $group: {
               _id: null, // Group everything into one array
               allProjects: { $push: "$$ROOT" } // Push all project data into one array
               }
         },
         {
               $project: {
               _id: 0, // Remove the group _id
               allProjects: 1
               }
         }
   ]);


   return res
         .status(200)
         .json(
               new ApiResponse(200, "Team Lead Projects fetched successfully", projects)
         )
   
   } 
   catch (error) {
   console.log(" Error => ", error.message)
   throw new ApiError(400, error.message);
   }

})




const fetchProjectByTeamId = asyncHandler (async (req, res) => {
   
   try {

   const { teamId } = req.params;

   if(!teamId) {
         throw new ApiError(400, "Please provide the team id");
   }

   const project = await Project.aggregate([
         {
               $match: {
               team: new mongoose.Types.ObjectId(teamId)
               }
         },
         {
               $lookup: {
               from: "teams",
               localField: "team",
               foreignField: "_id",
               as: "team",
               pipeline: [
                     {
                           $lookup: {
                           from: "employees",
                           localField: "employee",
                           foreignField: "_id",
                           as: "employeeDetails"
                           }
                     },
                     {
                           $addFields: {
                           employeeDetails: "$employeeDetails"
                           }
                     },
                     {
                           $lookup: {
                           from: "employees",
                           localField: "teamLead",
                           foreignField: "_id",
                           as: "teamLeadDetails"
                           }
                     },
                     {
                           $addFields: {
                           teamLeadDetails: ["$teamLeadDetails", 0]
                           }
                     }
               ]
               }
         },
         {
               $lookup: {
               from: "clients",
               localField: "client",
               foreignField: "_id",
               as: "client",
               }
         },
         {
               $lookup: {
               from: "tasks",
               localField: "_id",
               foreignField: "project",
               as: "task",
               }
         },
         {
               $lookup: {
               from: "tickets",
               localField: "_id",
               foreignField: "project",
               as: "ticket",
               }
         },
         {
               $addFields: {
               ticket: "$ticket"
               }
         },
         {
               $project: {
               admin: 1,
               clientName: 1,
               clientEmail: 1,
               client: 1,
               spokePersonEmail: 1,
               spokePersonName: 1,
               spokePersonNumber: 1,
               projectId: 1,
               projectName: 1,
               description: 1,
               descriptionDocument: 1,
               changes: 1,
               ticket: 1,
               team: 1,
               client: 1,
               task: 1,
               ticket: 1,
               }
         }
   ]);



   return res
         .status(200)
         .json(
               new ApiResponse(200, "Project fetched successfully", project)
         )



   
   } 
   catch (error) {
   console.log(" Error => ", error.message)
   throw new ApiError(400, error.message);
   }

})



export {
   getTeamLeadProjects,
   fetchProjectByTeamId
}

