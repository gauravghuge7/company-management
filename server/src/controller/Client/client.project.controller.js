import { Client } from "../../model/client.model.js";
import { Project } from "../../model/project.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";



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

export {
    createProject,
    fetchProjects,
}