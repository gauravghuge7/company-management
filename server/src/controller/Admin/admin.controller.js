import bcrypt
  from 'bcrypt';                 // this is the password bcrypt library for hashung the password
import jwt
  from 'jsonwebtoken';   //using the jwt token for the access and refresh token
import mongoose from 'mongoose';

import { uploadOnCloudinary } from '../../helper/cloudinary.js';
import { Admin } from '../../model/admin.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

// _id is using the mongoose _id property
const createAccessAndRefreshToken = async (_id) => {

    const admin = await Admin.findById(_id)

    // this token is used for the Access Token

    const adminAccessToken = admin.generateAdminAccessToken();
    const adminRefreshToken = admin.generateAdminRefreshToken();

    admin.adminRefreshToken = adminRefreshToken;

    await admin.save({validateBeforeSave: false});


    // return the response  for frontend 
    return {
        adminAccessToken,
        adminRefreshToken
    } 


}


const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};


const registerAdmin = asyncHandler(async (req, res) => {

    try {
        // accept the data from postman

        const {adminName, adminEmail, adminPassword} = req.body;

        // validate the data

        if(!adminName || !adminEmail || !adminPassword) {
            throw new ApiError(400, "Please provide all the required fields");
        }


        // check if the admin already exists

        const existedAdmin = await Admin.findOne({ adminEmail })

        if(existedAdmin) {
            throw new ApiError(400, "Admin already exists");
        }

        // create a entry in the database 

        const admin = await Admin.create({
            adminName,
            adminEmail,
            adminPassword
        })

        admin.save({validateBeforeSave: false});


        // return the response  for frontend

        return res.status(200).json(
            new ApiResponse(200, "Admin created successfully", admin)
        )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
})


const loginAdmin = asyncHandler(async (req, res) => {

    try {
        // accept the data from frontend

        const {adminEmail, adminPassword} = req.body;

        console.log("req.body => ", req.body)
        
        // validate the data

        if(!adminEmail || !adminPassword) {
            throw new ApiError(400, "Please provide all the required fields");
        }

        // find the entry in the database

        const admin = await Admin.findOne({ adminEmail })

        if(!admin) {
            throw new ApiError(400, "Admin does not exist");
        }

        // check if the password is correct

        const isPasswordCorrect = await bcrypt.compare(adminPassword, admin.adminPassword);

        if(!isPasswordCorrect) {
            throw new ApiError(400, "Invalid password");
        }

        // generate the access and refresh tokem

        const {adminAccessToken, adminRefreshToken} = await createAccessAndRefreshToken(admin._id);

        
        // return the response 

        return res
        .status(200)
        .cookie("adminAccessToken", adminAccessToken, options)
        .cookie("adminRefreshToken", adminRefreshToken, options)
        .json(
            new ApiResponse(200, "Admin logged in successfully", admin)
        )


    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
})


const logoutAdmin = asyncHandler(async (req, res) => {

    const { _id } = req.user;

    if(!_id) {
        throw new ApiError(400, "Please provide the admin email");
    }

    try {

        // find the entry in the database
        
        const admin = await Admin.findById(_id); 

        admin.adminRefreshToken = null;
        

        await admin.save({validateBeforeSave: false});
        

        return res
            .status(200)
            .clearCookie("adminAccessToken", options)
            .clearCookie("adminRefreshToken", options)
            .json(
                new ApiResponse(200, "Admin logged out successfully")
            )
        
    }
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }


})


const getAdmin = async(req, res) => {
    
    try {
        const {adminEmail} = req.user;
    
        if(!adminEmail) {
            throw new ApiError(400, "Please provide the admin email");
        }
    
        try {
    
            
            const admin = await Admin.findById(req.user._id);
            
            return res
                .status(200)
                .json(
                    new ApiResponse(200, "Admin fetched successfully", admin)
                )
    
        } 
        catch (error) {
            console.log(" Error => ", error.message)
            throw new ApiError(400, error.message);
        }
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }

}







export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getAdmin,
};