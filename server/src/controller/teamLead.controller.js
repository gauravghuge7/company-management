import { Task } from "../model/Task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";




const assignTasksToTeamMembers = asyncHandler(async (req, res) => {

      try {

            const {
                  project,
                  employee,
                  description,
                  teamLead,
                  assignBy,
                  ticket

            } = req.body;

            if(!project || !employee || !description || !teamLead || !assignBy || !ticket) {
                  throw new ApiError(400, "Please provide all the required fields");
            }

            // create a entry in Task Schema

            

            const task = await Task.create({

                  project,
                  employee,
                  description,
                  teamLead,
                  assignBy,
                  ticket

            })

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


export {
      assignTasksToTeamMembers,
      getTeamTasks
}