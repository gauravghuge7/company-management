import jwt from "jsonwebtoken";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Employee } from "../../model/employee.model.js";







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


export {
    getTotalEmployees,
    getTotalEmployeeDetails,
}