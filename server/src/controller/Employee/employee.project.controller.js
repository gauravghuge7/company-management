
import bcrypt from 'bcrypt';                 // this is the password bcrypt library for hashing the password
import jwt from 'jsonwebtoken';     //using the jwt token for the access and refresh token
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


const getEmployeeProjects = asyncHandler(async(req, res) => {
    
    try {

        const {_id} = req.user;

        if(!_id) {
            throw new ApiError(400, "Please provide the employee email");
        }

        const employee = await Employee.findById(_id);

        if(!employee) {
            throw new ApiError(400, "Employee does not exist");
        }

        // find the entry in a team as the teamLead
        
        // const teams = await Team.find({employee: employee._id})
        

        // const projects = await Project.aggregate([

        //     {
        //         $match: {
        //             team: teams.map(data => new mongoose.Types.ObjectId(data._id))
        //         }
        //     },

        // ])
        



       /// alter method for above code 


    const projects = await Team.aggregate([

        {
            $match: {
                employee: new mongoose.Types.ObjectId(employee._id)
            }
        },
        {
            $lookup: {
                from: "projects",
                localField: "_id",
                foreignField: "team",
                as: "project",

                pipeline: [
                    {
                        $lookup: {
                            from: "teams",
                            localField: "team",
                            foreignField: "_id",
                            as: "team",
                        }
                    },
                    {
                        $addFields: {
                            team: "$team.teamName",
                            teamId: "$team._id",
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                project: "$project"
            }
        },
        {
            $project: {
                project: 1,
            }
        }
    ])


    return res
        .status(200)
        .json(
            new ApiResponse(200, "Employee Projects fetched successfully", projects)
        )
    
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
})


const fetchProjectById = asyncHandler(async(req, res) => {
    
   try {
       
       const { projectId } = req.params;
       
       console.log("req.body => ", req.body);
       console.log("req.params => ", req.params);
       console.log("req.query => ", req.query);


       if(!projectId) {
           throw new ApiError(400, "Please provide the project id");
       }


       const project = await Project.aggregate([

           // Match the specific project
           {
               $match: {
                   _id: new mongoose.Types.ObjectId(projectId)
               }
           },
       
           // Fetch the team and the associated employees with all their details
           {
               $lookup: {
                   from: "teams",
                   localField: "team",
                   foreignField: "_id",
                   as: "team",
                   pipeline: [
                       // Lookup employees for each team
                       {
                           $lookup: {
                               from: "employees",
                               localField: "employee", // assuming 'team.employee' stores employee IDs
                               foreignField: "_id",
                               as: "employeeDetails"
                           }
                       },
       
                       // Include all employee details
                       {
                           $addFields: {
                               employeeDetails: "$employeeDetails"  // Keep all employee details in the result
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
       
           // Fetch the client information
           {
               $lookup: {
                   from: "clients",
                   localField: "client",
                   foreignField: "_id",
                   as: "client",
               }
           },
       
           // Fetch the tasks for the project
           {
               $lookup: {
                   from: "tasks",
                   localField: "_id",
                   foreignField: "project",
                   as: "task",
               }
           },
       
           // Fetch the tickets for the project
           {
               $lookup: {
                   from: "tickets",
                   localField: "_id",
                   foreignField: "project",
                   as: "ticket",
               }
           },
       
           // Final projection to specify which fields you want to include in the result
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
                   team: 1,  // The full team data with all employee details
                   client: 1,  // Client details as well
                   task: 1,  // All task details
                   ticket: 1,  // All ticket details
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

const getTasksByProjectId = asyncHandler (async (req, res) => {

   try {

       const  { projectId } = req.params;

       console.log("req.params => ", req.params);

       if(!projectId) {
           throw new ApiError(400, "Please provide the project id");
       }

       const task = await Task.aggregate([

           {
               $match: {
                   $and: [
                       {
                           project: new mongoose.Types.ObjectId(projectId)
                       },
                       {
                           employee: new mongoose.Types.ObjectId(req.user._id)
                       }
                   ]
               }
           },

           /*** tickets find ***/
           {
               $lookup: {
                   from: "tickets",
                   localField: "ticket",
                   foreignField: "_id",
                   as: "ticket"
               }
           },
           {
               $addFields: {
                   ticket: { $arrayElemAt: ["$ticket", 0]}
               }
           },

           /** teams Lead find and add to response **/
           {
               $lookup: {
                   from: "teams",
                   localField: "assignBy",
                   foreignField: "_id",
                   as: "assignBy",

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
                               teamLead: "$employeeDetails.employeeName"
                           
                           }
                       },
                   
                   ]
               }
           },



           /** FIND THE DETAILS SUCCESSFULLY AND SEND TO THE CLIENT */
           {
               $project: {
                   _id: 1,
                   description: 1,
                   taskDocument: 1,
                   taskName: 1,
                   assignBy: 1,
                   dueDate: 1,

                   status: 1,
                   priority: 1,

                   currentWork: 1,
                   

                   ticket: 1,
                   teamLead: 1,



               }
           }
           
       ])

       // find  a project by the project id 
       // pick the team _id from the project schema 
       // find the team by the team id that we pick from the project schema 
       // populate the all employees detail from the employees collection using agregate query 

       
       const project = await Project.findById(projectId);

       if(!project) {
           throw new ApiError(400, "Project does not exist");
       }

       
       const team = await Team.aggregate([
           {
               $match: {
                   _id : new mongoose.Types.ObjectId(project.team)
               }
           },

           {
               $lookup: {
                   from: "employees",
                   localField: "employee",  // assuming 'team.employee' stores employee 
                   foreignField: "_id",
                   as: "employeeDetails",
               }
           },
           {
               $addFields: {
                   employeeDetails: "$employeeDetails",
               }
           },
           {
               $project: {  // Final projection to specify 
               
                   employeeDetails: 1,
                   teamName: 1,
               }
           }
       ])


       console.log("team", team);



       return res
           .status(200)
           .json(
               new ApiResponse(200, "Task fetched successfully", task, team[0])
           )
       
   } 
   catch (error) {
   
       console.log(" Error => ", error.message)
       throw new ApiError(400, error.message);
   }
})


const forwardTicketsAndTasksToAnotherEmployee = asyncHandler(async(req, res) => {

   try {

       const {_id} = req.user;

       if(!_id) {
           throw new ApiError(400, "Please provide the employee email");
       }


       const {employeeId, taskId} = req.body;

       // get data from the frontend
       /**

           employeeId  

       
       */

   
       // find the entry in the database

       const employee = await Employee.findById(_id);

       if(!employee) {
           throw new ApiError(400, "Employee does not exist");
       }

       // check if the employee already exists

       const existedEmployee = await Employee.findById(employeeId)

       if(!existedEmployee) {
           throw new ApiError(400, "Employee does not exist");
       }

       // check the entry in tasks 

       const task = await Task.findOne({employee: employee._id, taskId: taskId})

       if(!task) {
           throw new ApiError(400, "Employee does not exists in the task");
       }

       /// push current employee to the previous employee array
       task.previousEmployee.push(employee._id);

       // set the current employee to the new employee
       task.employee = req.body.employeeId;

       await task.save({validateBeforeSave: false});
       

       console.log("save task =>  ", task);

       
       return res.status(200).json(                                           // 
           new ApiResponse(200, "ticket forward successfully to another employee", employee)
       )
       
   } 
   catch (error) {
       console.log(" Error => ", error.message)
       throw new ApiError(400, error.message);    
   }

})



const getEmployeeAllTasks = asyncHandler(async (req, res) => {
    
    try {


        const task = await Task.aggregate([

            {
                $match: {employee: new mongoose.Types.ObjectId(req.user._id)}
            },

            {
                $lookup: {
                    from: "tickets",
                    localField: "ticket",
                    foreignField: "_id",
                    as: "ticket"
                }
            },
            {

                $addFields: {
                    ticket: {
                        $arrayElemAt: ["$ticket", 0]
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    ticket: 1,
                    status: 1,
                    description: 1,
                    employee: 1,
                    created_at: 1,
                    priority: 1,
                    taskDocument: 1,
                    taskName: 1,
                    assignBy: 1,
                    dueDate: 1,
                }
            }


        ])

        const tempTask = await Task.find({});

        console.log("tempTasks => ", tempTask);


        
        // const task = await Task.find({employee: new mongoose.Types.ObjectId(req.user._id)})
        
        return res
            .status(200)
            .json(
                new ApiResponse(200, "Employee Tasks fetched successfully", task)
            )
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
})



export {
    getEmployeeProjects,
    fetchProjectById,
    getTasksByProjectId,
    forwardTicketsAndTasksToAnotherEmployee,
    getEmployeeAllTasks
}