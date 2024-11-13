import mongoose from "mongoose";


import { uploadOnCloudinary } from "../../helper/cloudinary.js";
import { Project } from "../../model/project.model.js";
import { Team } from "../../model/team.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";



const createProject = asyncHandler(async (req, res) => {

   try {
      const {_id} = req.user;

      if(!_id) {
         throw new ApiError(400, "Please provide the admin email");
      }


      // get the data from the body
      const { 
         
         projectName,
         projectId,

         spokePersonNumber,
         spokePersonName,
         spokePersonEmail, 
         team, 
         description,

         clientName,
         client, 
         

      } = req.body;

      console.log("req.body => ", req.body)


      if(!projectName || !spokePersonNumber || !spokePersonName || !spokePersonEmail || !team || !clientName || !client || !projectId) {
         throw new ApiError(400, "Please provide all the required fields");
      }

      
      // check if the project already exists
      
      const existedProject = await Project.findOne({ projectId })
      
      if(existedProject) {
         throw new ApiError(400, "Project already exists");
      }

      console.log("req.file => ", req.file)
      console.log("req.files => ", req.files)


      // upload a description on cloudinary

      const response = await uploadOnCloudinary(req.file.path);
      

   

      // create a entry in the database 
      
      const project = await Project.create({
         projectName,

         description: description,
         descriptionDocument: response.url,

         spokePersonNumber,
         spokePersonName,
         spokePersonEmail,
         team,
         clientName,
         client,
         projectId,
         admin: req?.user?._id

      })
      await project.save();


      const findTeam = await Team.findById(team);

      team.project.push(project._id);
      await findTeam.save({validateBeforeSave: false});

      return res  
         .status(200)
         .json(
            new ApiResponse(200, "Project created successfully", project)
         )

      
} 
catch (error) {
      console.log(" Error => ", error.message)
      throw new ApiError(400, error.message);
}

})



const getAllProjects = asyncHandler(async(req, res) => {

try {


      const project = await Project.aggregate([

         {
            $match: {
                  admin: new mongoose.Types.ObjectId(req.user._id)
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
                              localField: "teamLead",
                              foreignField: "_id",
                              as: "teamLead",
                        },

                     },

                     {
                        $addFields: {
                              teamLead: "$teamLead.employeeName", 
                              teamLeadEmail: "$teamLead.employeeEmail",
                        }
                     }
                  ]
            }
         },

         {
            $addFields: {
                  teamLead: "$teamLead.employeeName",
                  teamLeadEmail: "$teamLead.employeeEmail",
            }
         },
      

         {
            $project: {

                  admin: 1,

                  projectName: 1,
                  projectId: 1,
                  description: 1,


                  clientName: 1,
                  client: 1,
                  spokePersonNumber: 1,
                  spokePersonName: 1,
                  spokePersonEmail: 1,


                  team: 1,
                  teamLead: 1,
                  teamLeadEmail: 1,
            }
         }
      ])


      return res
         .status(200)
         .json(
            new ApiResponse(
                  200, 
                  "Total projects fetched successfully", 
                  {
                     project
                  }
            )
         )

      
} 
catch (error) {
      
      console.log(" Error => ", error.message)
      throw new ApiError(400, error.message);
}

})


export {
   createProject,
   getAllProjects
}