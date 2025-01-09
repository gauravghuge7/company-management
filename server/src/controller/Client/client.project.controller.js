import { Client } from "../../model/client.model.js";
import { Project } from "../../model/project.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import mongoose from "mongoose";



const createProject = asyncHandler(async(req, res) => {

   try {

       const { clientEmail } = req.user;

       const {projectId, projectName, description} = req.body;

       // validate the data 
       if(!projectId || !clientEmail  || !projectName || !description) {

           throw new ApiError(400, "Please provide all the required fields");    
       }
       
       // find the entry in the database
       
       const client = await Client.findOne({ clientEmail })
       
       if(!client) {
           throw new ApiError(400, "Client does not exist");
       }

       // create a entry in the database

       const project = await Project.create({
           projectId,
           clientEmail,
           projectName,
           description
       })

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


const fetchProjects = asyncHandler(async (req, res) => {

   try {



       const projects = await Project.aggregate([

           {
               $match: {
                   client: new mongoose.Types.ObjectId(req.user._id)
               }
           },

           {
               $lookup: {
                   from: "teams",
                   foreignField: "_id",
                   localField: "team",
                   as: "team",
                   
                   pipeline: [

                       {
                           $lookup: {
                               from: "employees",
                               foreignField: "_id",
                               localField: "teamLead",
                               as: "teamLead",
                           
                           },

                       },

                       {
                           $addFields: {
                               teamLead: "$teamLead.employeeName"
                           }
                       }
                   ]
               }
           
           },

           {
               $project: {

                   teamLead: 1,

                   projectName: 1,
                   projectId: 1,

                   team: 1,

                   spokePersonEmail: 1,
                   spokePersonName: 1,
                   spokePersonNumber: 1,
                   description: 1,
                   descriptionDocument: 1,

                   clientName: 1,
                   clientEmail: 1,
               }
           }



       ])


       return res
           .status(200)
           .json(
               new ApiResponse(200, "Projects fetched successfully", projects)
           )
       
   } 
   catch (error) {
       console.log(" Error => ", error.message)
       throw new ApiError(400, error.message);
   }
})


const editProject = asyncHandler( async (req, res) => {
   
    try {
        const {_id} = req.user;
    
        if(!_id) {
            throw new ApiError(400, "Please provide the admin email");
        }
    
        const { 
            projectId,
            projectName,
            description,
            spokePersonNumber,
            spokePersonName,
            spokePersonEmail,
            team,
            clientName,
            client,
        } = req.body;
    
        if(!projectId || !projectName || !spokePersonNumber || !spokePersonName || !spokePersonEmail || !team || !clientName || !client) {
            throw new ApiError(400, "Please provide all the required fields");
        }
    
        // check if the project already exists
        
        const existedProject = await Project.findOne({ projectId })
        
        if(!existedProject) {
            throw new ApiError(400, "Project does not exist");
        }
    
        // update the project
        await Project.findOneAndUpdate(
            { projectId },
            {
                $set: {
                    projectName,
                    description,
                    spokePersonNumber,
                    spokePersonName,
                    spokePersonEmail,
                    team,
                    clientName,
                    client,
                }
            },
            { new: true }
        )
 

        return res
            .status(200)
            .json(
                new ApiResponse(200, "Project updated successfully")
            )
    
    }  
    catch (error) {
        return res
            .status(500)
            .json(
                new ApiResponse(500, e?.message)
            )
    }        
 
 
 
 
 
})  
 
const deleteProject = asyncHandler(async (req, res) => {
    try {
        const { projectId } = req.params;
        const { userId } = req.user;

        
        const project = await Project.findByIdAndDelete(projectId);
        if (!project) {
            throw new ApiError(404, "Project not found");
        }
        
        // await User.findByIdAndUpdate(userId, { $pull: { projects: projectId } });
        
        return res.status(200).json(
            new ApiResponse(200, "Project deleted successfully")
        )
    } 
    catch (error) {
        return res.status(500).json(
            new ApiResponse(500, "Internal server error")
        )
    }
})
 

export {
    createProject,
    fetchProjects,
    editProject,
    deleteProject
}