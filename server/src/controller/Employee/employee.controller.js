import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import { Employee } from '../../model/employee.model.js';
import { Project } from '../../model/project.model.js';
import { Task } from '../../model/Task.model.js';
import { Team } from '../../model/team.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

const createAccessAndRefreshToken = async (_id) => {
    
    const employee = await Employee.findById(_id)
    
    // this token is used for the Access Token
    
    const employeeAccessToken = employee.generateEmployeeAccessToken();
    const employeeRefreshToken = employee.generateEmployeeRefreshToken();
    
    employee.employeeRefreshToken = employeeRefreshToken;
    
    await employee.save({validateBeforeSave: false});
    
    return {
        employeeAccessToken,
        employeeRefreshToken
    }
    
}

const options = {
    
    httpOnly: true,
    secure: true,
    
}



const registerEmployee = asyncHandler(async(req, res) => {

    const {_id} = req.user;

    try {
        // accept the data from frontend  that this we are using the try catch block

        const {employeeName, employeeEmail, designation, employeePassword } = req.body;

        // get the admin email from the request 
        const {adminEmail} = req.user;

        if(!employeeName || !employeeEmail || !designation || !employeePassword) {

            throw new ApiError(400, "Please provide all the required fields");    
        }

        if(!adminEmail) {
            throw new ApiError(400, "Please provide the admin email");
        }

        // check if the employee already exists

        const existedEmployee = await Employee.findOne({ employeeEmail })


        if(existedEmployee) {
            throw new ApiError(400, "Employee already exists");
        }

        // create a entry in the database 

        const employee = await Employee.create({
            employeeName,
            employeeEmail,
            designation,
            adminEmail,
            employeePassword,
            admin: _id,
            isTeamLeader: false
        })

        
        return res.status(200).json(                                           // 
            new ApiResponse(200, "Employee created successfully", employee)
        )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);    
    }

})

const loginEmployee = asyncHandler(async(req, res) => {

    try {
        // accept the data from frontend  that this we are using the try catch block
        
        const { employeeEmail, employeePassword } = req.body;
        
        
        // validate the data 
        if(!employeeEmail || !employeePassword) {
            throw new ApiError(400, "Please provide all the required fields");    
        }

        // find the entry in the database

        const employee = await Employee.findOne({ employeeEmail })
        
        if(!employee) {
            throw new ApiError(400, "Employee does not exist");
        }
        
        // check if the password is correct

        const isPasswordCorrect = await bcrypt.compare(employeePassword, employee.employeePassword);

        if(!isPasswordCorrect) {
            throw new ApiError(400, "Invalid password");
        }

        // generate the access and refresh tokem

        const {employeeAccessToken, employeeRefreshToken} = await createAccessAndRefreshToken(employee._id);

        
        // return the response 

        return res
        .status(200)
        .cookie("employeeAccessToken", employeeAccessToken, options)
        .cookie("employeeRefreshToken", employeeRefreshToken, options)
        .json(
            new ApiResponse(200, "Employee logged in successfully", employee)
        )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }

})


const logoutEmployee = asyncHandler(async(req, res) => {
    
    try {
        
        const {_id} = req.user;
        
        if(!_id) {
            throw new ApiError(400, "Please provide the employee email");
        }
        
        
        // find the entry in the database
        
        const employee = await Employee.findById(_id);
        
        if(!employee) {
            throw new ApiError(400, "Employee does not exist");
        }   
        
        employee.employeeRefreshToken = null;
        
        await employee.save({validateBeforeSave: false});
        
        return res
            .status(200)
            .clearCookie("employeeAccessToken", options)
            .clearCookie("employeeRefreshToken", options)
            .json(
                new ApiResponse(200, "Employee logged out successfully")
            )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
    
})


const getEmployeeDetails = async(req, res) => {

    try {
        // accept the data from frontend  that this we are using the try catch block
        
        const {_id} = req.user;
        
        const employee = await Employee.findById(_id);
        
        if(!employee) {
            throw new ApiError(400, "Employee does not exist");
        }
        
        // return the response 
        return res
            .status(200)
            .json(
                new ApiResponse(200, "Employee Details fetched successfully", employee)
            )
        
    } 
    catch (error) {
        
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
    
}

const getEmployeePassword = asyncHandler(async(req, res) => {

    try {

        
        
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }

})


const employeelogout = asyncHandler(async(req, res) => {
    
    try {
        
        const {_id} = req.user;
        
        if(!_id) {
            throw new ApiError(400, "Please provide the employee email");
        }
        
        
        // find the entry in the database
        
        const employee = await Employee.findById(_id);
        
        if(!employee) {
            throw new ApiError(400, "Employee does not exist");
        }   
        
        employee.employeeRefreshToken = null;
        
        await employee.save({validateBeforeSave: false});
        
        return res
            .status(200)
            .clearCookie("employeeAccessToken", options)
            .clearCookie("employeeRefreshToken", options)
            .json(
                new ApiResponse(200, "Employee logged out successfully")
            )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
    
})






const getEmployeeByTeam = asyncHandler(async(req, res) => {
    try {
    
        const { teamId } = req.params;
        
        if(!teamId) {
            throw new ApiError(400, "Please provide the team id");
        }

        const employee = await Employee.aggregate([

            {
                $match: {
                    team: new mongoose.Types.ObjectId(teamId)
                }
            },

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
                    employeeDetails: "$employeeDetails"
                }
            },
            {
                $project: {
                    employeeDetails: 1,
                }
            }


        ])


        return res
            .status(200)
            .json(
                new ApiResponse(200, "Employee fetched successfully", employee)
            )

    } 
    catch (error) {
        console.log(" Error => ", error.message)    
        throw new ApiError(400, error.message);
    }
})





export {

    registerEmployee,
    loginEmployee,
    logoutEmployee,
    employeelogout,

    getEmployeeDetails,
    getEmployeePassword,
    getEmployeeByTeam

};