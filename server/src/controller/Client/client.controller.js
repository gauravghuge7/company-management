import bcrypt from 'bcrypt';                 // this is the password bcrypt library for hashung the password
import mongoose from 'mongoose';
import { ApiError } from '../../utils/ApiError.js';
import { Client } from '../../model/client.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';



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




export {
    registerClient,
    loginClient,
    logoutClient
};