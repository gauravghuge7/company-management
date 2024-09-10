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
    secure: true,

}


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



const getTotalEmployees = async(req, res) => {


    const {adminEmail} = req.user;  // 

    if(!adminEmail) {   // validation 
        throw new ApiError(400, "Please provide the admin email");
    }

    try {
        // accept the data from frontend  that this we are using the try catch block

        const employeeList = await Employee.find({adminEmail});
        
        return res
            .status(200)
            .json(
                new ApiResponse(200, "Total employees", employeeList.length)
            )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
}


const getTotalEmployeeDetails = async (req, res) => {

    const {adminEmail} = req.user;
    
    if(!adminEmail) {
        throw new ApiError(400, "Please provide the admin email");
    }
    
    try {

        // accept the data from frontend  that this we are using the try catch block
        
        const employeeList = await Employee.find({admin: req.user._id})

        console.log("employeeList => ", employeeList)

        let password = []
        
        const data = employeeList.map((data) => {

            
            
            data.sendToken = jwt.verify(
                data.employeePasswordToken,
                process.env.EMPLOYEE_PASSWORD_TOKEN,
            )
            
        })

        

        const emp = await Employee.find({admin: req.user._id})
        
        console.log("emp => ", emp)
        

        console.log("data => ", data)

        // console.log("password => ", password)

        
        
        
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200, 
                    "Total employee details fetched successfully",
                    employeeList
                )
            )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }

}


const getAllClients = async(req, res) => {

    const {adminEmail} = req.user;
    
    if(!adminEmail) {
        throw new ApiError(400, "Please provide the admin email");
    }
    
    try {
        // accept the data from frontend  that this we are using the try catch block
        
        const clientList = await Client.find({adminEmail});
        
        const passwordToken = process.env.CLIENT_PASSWORD_TOKEN;

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200, 
                    "client list fetched successfully", 
                    {
                        clientList,
                        passwordToken
                    }
                )
            )
        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }
}


const createTeams = asyncHandler(async (req, res) => {

    try {

        // accept the data from the body 
        // console.log("req.body => ", req.body)



        const {teamName, teamLead, projectId, employee, teamId} = req.body;

        // validate the data
        
        if(!teamName || !teamLead || !projectId || !employee) {
            throw new ApiError(400, "Please provide all the required fields");
        }

        // check if the team already exists
        
        const existedTeam = await Team.findOne({ teamId })
        
        if(existedTeam) {
            throw new ApiError(400, "Team already exists");
        }


        /// find the team lead in Employee document
        /// get the mongoDB id of the team lead


        const teamLeadId = await Employee.findOne({employeeName: teamLead})

        console.log("teamLeadId => ", teamLeadId)

        if(!teamLeadId) {
            throw new ApiError(400, "Team lead does not exist");
        }

        
        const employeeId = await Employee.find({employeeName: employee})

        console.log("employeeId => ", employeeId)

        if(employeeId.length < 1 ) {
            throw new ApiError(400, "you are note selected any employee");
        }
        

        

        // create a entry in the database 
        
        const team = await Team.create({
            teamName,
            teamLead: teamLeadId._id,
            projectId,
            employee: employeeId.map(data => data._id),
            teamId,
            admin: req.user._id
        })

        team.save({validateBeforeSave: false});

        return res  
            .status(200)
            .json(
                new ApiResponse(200, "Team created successfully", team)
            )

        
    } 
    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }

})



const getAllTeams = async(req, res) => {

    try {


        const team = await Team.aggregate([

            {
                $match: {
                    admin: new mongoose.Types.ObjectId(req.user._id)
                }
            },

            {
                $lookup: {
                    from: "employees",
                    localField: "teamLead",
                    foreignField: "_id",
                    as: "teamLead",
                }
            },

            {
                $lookup: {
                    from: "employees",
                    localField: "employee",
                    foreignField: "_id",
                    as: "employees",

                }
            },

            

                 // Preserve the entire teamLead array as is
            {
                $unwind: {
                    path: "$teamLead",
                    preserveNullAndEmptyArrays: true
                }
            },

            // $addFields to include the teamLeadName and employees array
            {
                $addFields: {
                    teamLead: "$teamLead.employeeName",
                    employee: "$employees.employeeName",
                    teamLeadEmail: "$teamLead.employeeEmail",
                    employeesEmail: "$employees.employeeEmail"

                }
            },

            {
                $project: {
                    teamName: 1,
                    teamId: 1,
                    
                    teamLeadEmail: 1,
                    employeesEmail: 1,
                    teamLead: 1,
                    employee: 1,
                    
                }
            }

        ])


        const teamList = await Team.find({admin: req.user._id}).populate("employee")

        // console.log("teamList => ", teamList);

        teamList.map(data => {
            console.log(data.employee);
        }) 


        return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                "Total teams fetched successfully", 
                {
                    team
                }
            )
        )
        
    } 


    catch (error) {
        console.log(" Error => ", error.message)
        throw new ApiError(400, error.message);
    }


}


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
  createTeams,
  getAdmin,
  getAllClients,
  getAllProjects,
  getAllTeams,
  getTotalEmployeeDetails,
  loginAdmin,
  logoutAdmin,
  registerAdmin,
};