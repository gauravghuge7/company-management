import { Task } from "../model/Task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from "../helper/cloudinary.js"
import mongoose from "mongoose";



    // assign Tasks To TeamMembers
const assignTasksToTeamMembers = asyncHandler(async (req, res) => {

      try {

            const {
                  project,
                  employee,
                  description,
                  assignBy,
                  tickets, 
                  taskName,
                  priority,
                  dueDate

            } = req.body;


            console.log("req.body => ", req.body);

            if(!project || !employee || !description || !assignBy || !dueDate ) {
                  throw new ApiError(400, "Please provide all the required fields");
            }

            // create a entry in Task Schema

            let response;



            if(req.file) {

                  response = await uploadOnCloudinary(req.file.path);
            }
            
            let notTicket = "for ticket verification";

            if(tickets === "ownWork") {
                  notTicket = null
            }
            

            const task = await Task.create({

                  project,
                  employee,
                  description,
                  assignBy,
                  dueDate,
                  taskDocument: response?.url,
                  taskName,
                  priority,
                  status: "Started",
                  currentWork: "Assigned task to employee",


            })

            if(notTicket) {
                  task.ticket = tickets;

                  await task.save({validateBeforeSave: false});
            }



            return res
                  .status(200)
                  .json(
                        new ApiResponse(200, "Task created successfully", task)
                  )
      } 
      catch (error) {
            
            console.log(" Error => ", error.message)
            throw new ApiError(400, error.message);
      }

})


const getTeamTasks = asyncHandler(async (req, res) => {
      
      try {

            const { employee } = req.params;

            if(!employee) {
                  throw new ApiError(400, "Please provide the team lead email");
            }

            const tasks = await Task.find({employee: employee})
                  .populate("project")
                  .populate("employee")
                  .populate("teamLead")
                  .populate("ticket")
                  .populate("assignBy")
                  .sort({createdAt: "desc"})
                  .limit(10)

            return res
                  .status(200)
                  .json(
                        new ApiResponse(200, "Team Tasks fetched successfully", tasks)
                  )
      } 
      catch (error) {
            
            console.log(" Error => ", error.message)
            throw new ApiError(400, error.message);
      }

})


const getTasksByProjectId = asyncHandler (async (req, res) => {
      
      try {
      
            const  { projectId } = req.params;
      
            if(!projectId) {
                  throw new ApiError(400, "Please provide the project id");
            }

            console.log("req.params => ", req.params);

            const viewAllTasks = await Task.find({})

            console.log("viewAllTasks => ", viewAllTasks)
      
            // const task = await Task.aggregate([
            //       {
            //             $match: {
            //                   project: new mongoose.Types.ObjectId(projectId)
            //             }
            //       }
            // ]);
            // console.log("task => ", task)
      
            

            const task = await Task.$where(function () {
                  return this.project.toString() === projectId;
            }); 
      
            return res
                  .status(200)
                  .json(
                        new ApiResponse(200, "Task fetched successfully", task)
                  )
            
      } 
      catch (error) {
      
            console.log(" Error => ", error.message)
            throw new ApiError(400, error.message);
      }
})




export {
      assignTasksToTeamMembers,
      getTeamTasks,

      getTasksByProjectId
}