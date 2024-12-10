import bcrypt from 'bcrypt';

import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';


import { Admin } from '../model/admin.model.js';
import { Client } from '../model/client.model.js';
import { Employee } from '../model/employee.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';





//    conditional login 




// common options for all users
const options = {
   httpOnly: true,
   secure: process.env.NODE_ENV === 'production',
   sameSite: 'None',
   maxAge: 7 * 24 * 60 * 60 * 1000,
};



const createEmployeeAccessAndRefreshToken = async (_id) => {
    
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


const createAdminAccessAndRefreshToken = async (_id) => {

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


const createClientAccessAndRefreshToken = async(clientId) => {            

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

const loginUser = asyncHandler(async (req, res) => {


   try {
   
      const {employeeEmail, employeePassword} = req.body;

      const employee = await Employee.findOne({employeeEmail: employeeEmail});

      if(employee ) {

         const isPasswordCorrect = await bcrypt.compare(employeePassword, employee.employeePassword);

        if(!isPasswordCorrect) {
            throw new ApiError(400, "Invalid password");
        }

        // generate the access and refresh tokem

        const {employeeAccessToken, employeeRefreshToken} = await createEmployeeAccessAndRefreshToken(employee._id);

        
        // return the response 

        return res
        .status(200)
        .cookie("employeeAccessToken", employeeAccessToken, options)
        .cookie("employeeRefreshToken", employeeRefreshToken, options)
        .json(
            new ApiResponse(200, "Employee logged in successfully", employee)
         )
      }

      const admin = await Admin.findOne({adminEmail: employeeEmail});

      if(admin) {

         // check if the password is correct

         const isPasswordCorrect = await bcrypt.compare(employeePassword, admin.adminPassword);

         if(!isPasswordCorrect) {
               throw new ApiError(400, "Invalid password");
         }

         // generate the access and refresh tokem

         const {adminAccessToken, adminRefreshToken} = await createAdminAccessAndRefreshToken(admin._id);

         
         // return the response 

         return res
         .status(200)
         .cookie("adminAccessToken", adminAccessToken, options)
         .cookie("adminRefreshToken", adminRefreshToken, options)
         .json(
               new ApiResponse(200, "Admin logged in successfully", admin)
            )

      }

      const client = await Client.findOne({clientEmail: employeeEmail});
      
      if(client) {

         // check if the password is correct
        
        const isPasswordCorrect = await bcrypt.compare(employeePassword, client.clientPassword);
        
        if(!isPasswordCorrect) {
            throw new ApiError(400, "Invalid password");
        }
        
        // generate the access and refresh tokem
        
        const {clientAccessToken, clientRefreshToken} = await createClientAccessAndRefreshToken(client._id);
        
        
        // return the response 
        
        return res
            .status(200)
            .cookie("clientAccessToken", clientAccessToken, options)
            .cookie("clientRefreshToken", clientRefreshToken, options)
            .json(
                new ApiResponse(200, "Client logged in successfully", client)
            )
      }


      throw new ApiError(400, "Employee does not exist");
      
   } 
   catch (error) {
      console.log("Error => ", error);
      throw new ApiError(200, error.message);
   }

})



export {
   loginUser
}