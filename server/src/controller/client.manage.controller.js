import bcrypt
  from 'bcrypt';                 // this is the password bcrypt library for hashung the password
import jwt
  from 'jsonwebtoken';   //using the jwt token for the access and refresh token
import mongoose from 'mongoose';

import { uploadOnCloudinary } from '../helper/cloudinary.js';
import { Admin } from '../model/admin.model.js';
import { Client } from '../model/client.model.js';
import { Employee } from '../model/employee.model.js';
import { Project } from '../model/project.model.js';
import { Team } from '../model/team.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';


function editClient(req, res) { 


    try {

        console.log("req.body => ", req.body);

        const {_id, clientName, clientEmail } = req.body;

        if(!_id || !clientName || !clientEmail ) {
            throw new ApiError(400, "Please provide all the required fields");
        }

        // check if the client already exists
        
        const existedClient = await Client.findOne({ _id })
        
        if(!existedClient) {
            throw new ApiError(400, "Client does not exist");
        }

        // update the entry in the database 
        
        const client = await Client.findByIdAndUpdate(_id, {
            clientName,
            clientEmail,
           
        })
        
        return res.status(200).json(                                           // 
            new ApiResponse(200, "Client updated successfully", client)
        )
    
    }
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);    
    }

}

function deleteClient(req, res) { 

    try {

        console.log("req.query => ", req.query);
        console.log("req.params => ", req.params);

        const {clientId} = req.params;

        if(!clientId) {
            throw new ApiError(400, "Please provide the client id");
        }

        // find the entry in the database
        
        const client = await Client.findById(clientId)
        
        if(!client) {
            throw new ApiError(400, "Client does not exist");
        }
        
        // delete the entry in the database 
        
        await Client.findByIdAndDelete(clientId);
        
        return res.status(200).json(                                           // 
            new ApiResponse(200, "Client deleted successfully", client)
        )
    
    }
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);    
    }

}


export {
    editClient,
    deleteClient
};