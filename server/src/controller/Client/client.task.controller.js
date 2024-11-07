import mongoose from "mongoose";
import { Client } from "../../model/client.model.js";
import { Project } from "../../model/project.model.js";
import { Ticket } from "../../model/ticket.project.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../helper/cloudinary.js";


const fetchTasks = asyncHandler (async (req,res) => {
    
   try {

       const { projectId } = req.params;

       const tickets = await Ticket.aggregate([
           {
               $match: {
                   project: new mongoose.Types.ObjectId(projectId)
               }
           }

       ])


       return res
           .status(200)
           .json(
               new ApiResponse(200, "tickets fetched successfully", tickets)
           )
       
       
   } 
   catch (error) {
   
       console.log(" Error => ", error.message)
       throw new ApiError(400, error.message);
   }

})



const createTicket = asyncHandler(async (req, res) => {

   try {
       
       const { 
           assignedTo, 
           assignedByEmail, 
           assignedByName, 


           priority,
           project,

           ticketId,
           description,  
           ticketName,
           saptype,
           dueDate
       
       } = req.body;

       console.log("req.body", req.body);

       console.log("req.file", req.file);


       if(!assignedTo || !assignedByEmail || !assignedByName || !priority || !project || !ticketId || !description) {
           throw new ApiError(400, "Please provide all the required fields");
       }

       // find the entry in the database
       const client = await Client.findOne({ clientEmail: req.user.clientEmail })
       
       if(!client) {
           throw new ApiError(400, "Client does not exist");
       }





       const response = await uploadOnCloudinary(req.file.path);
       


       // create a entry in the database
       const ticket = await Ticket.create({

           assignedTo,
           assignedByEmail,
           assignedByName,
           priority,
           project,
           ticketId,
           ticketDescription: description,
           ticketName,
           ticketDocument: response?.url,
           saptype,
           dueDate,
           status: "Open",


       })
   
       return res
           .status(200)
           .json(
               new ApiResponse(200, "Ticket created successfully", ticket)
           )

   } 
   catch (e) {
       console.error('Error', e)
       throw new ApiError(400, e.message)
   }
   
})


export {
    createTicket,
    fetchTasks,
}


