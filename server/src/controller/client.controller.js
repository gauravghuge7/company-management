import bcrypt
  from 'bcrypt';                 // this is the password bcrypt library for hashung the password
import mongoose from 'mongoose';

import {
  Client,
} from '../model/client.model.js';    // modeler client import here
import { Project } from '../model/project.model.js';
import { Ticket } from '../model/ticket.project.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {uploadOnCloudinary} from "../helper/cloudinary.js"


const createAccessAndRefreshToken = async(clientId) => {            

    const client = await Client.findById(clientId);
    

    

    const clientAccessToken = client.generateClientAccessToken();
    const clientRefreshToken = client.generateClientRefreshToken();
    
    client.clientAccessToken = clientAccessToken;

    await client.save({validateBeforeSave: false});
    
    return {
        clientAccessToken,
        clientRefreshToken
    }
}

const options = {

    httpOnly: true,
    secure: true,
    
};


const registerClient = async(req, res) => {

    try {
        // accept the data from frontend  that this we are using the try catch block

        const { clientName, clientEmail, clientPassword } = req.body;

        // get the admin email from the request 
        const {adminEmail} = req.user;

        if(!clientName || !clientEmail  || !clientPassword) {

            throw new ApiError(400, "Please provide all the required fields");    
        }

        if(!adminEmail) {
            throw new ApiError(400, "Please provide the admin email");
        }

        // check if the client already exists

        const existedClient = await Client.findOne({ clientEmail })


        if(existedClient) {
            throw new ApiError(400, "Client already exists");
        }

        // create a entry in the database 

        const client = await Client.create({
            clientName,
            clientEmail,
            clientPassword,
            adminEmail
            
        })

        
        return res
        .status(200).json(                               
            new ApiResponse(200, "Client created successfully", client)
        )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);    
    }

}

const loginClient = asyncHandler(async(req, res) => {
    
    try {
        const { clientEmail, clientPassword } = req.body;
        
        // validate the data 
        if(!clientEmail || !clientPassword) {
            throw new ApiError(400, "Please provide all the required fields");    
        }
        
        // find the entry in the database
        
        const client = await Client.findOne({ clientEmail })
        
        if(!client) {
            throw new ApiError(400, "Client does not exist");
        }
        
        // check if the password is correct
        
        const isPasswordCorrect = await bcrypt.compare(clientPassword, client.clientPassword);
        
        if(!isPasswordCorrect) {
            throw new ApiError(400, "Invalid password");
        }
        
        // generate the access and refresh tokem
        
        const {clientAccessToken, clientRefreshToken} = await createAccessAndRefreshToken(client._id);
        
        
        // return the response 
        
        return res
            .status(200)
            .cookie("clientAccessToken", clientAccessToken, options)
            .cookie("clientRefreshToken", clientRefreshToken, options)
            .json(
                new ApiResponse(200, "Client logged in successfully", client)
            )
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
})

const logoutClient = asyncHandler(async(req, res) => {
    
    try {
        
        const {_id} = req.user;   // get id from cookies 
        
        if(!_id) {  // validation
            throw new ApiError(400, "Please provide the client email");
        }
        
        
        // find the entry in the database
        
        const client = await Client.findById(_id);
        
        if(!client) {
            throw new ApiError(400, "Client does not exist");
        }   
        
        client.clientRefreshToken = null;
        
        await client.save({validateBeforeSave: false});
        
        return res
            .status(200)
            .clearCookie("clientAccessToken", options)
            .clearCookie("clientRefreshToken", options)
            .json(
                new ApiResponse(200, "Client logged out successfully")
            )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
    
})


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
        const { clientEmail } = req.user;
        
        // // find the entry in the database then check and return the response
        
        // const client = await Client.findOne({ clientEmail })
        
        // if(!client) {
        //     throw new ApiError(400, "Client does not exist");
        // }
        
        // const projects = await Project.find({ clientEmail })
        


        const projects = await Project.aggregate([

            {
                $match: {
                    client: new mongoose.Types.ObjectId(req.user._id)
                }
            },

            {
                $lookup: {
                    from: "tickets",
                    localField: "_id",
                    foreignField: "project",
                    as: "tickets"
                }
            },

            {
                $addFields: {
                    tickets: "$tickets"
                }
            },
            

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
  createProject,
  createTicket,
  fetchProjects,
  fetchTasks,
  loginClient,
  logoutClient,
  registerClient,
};