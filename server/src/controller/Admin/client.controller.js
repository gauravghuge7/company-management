import { Client } from "../../model/client.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const getAllClients = asyncHandler(async (req, res) => {

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
})



export {
    getAllClients
}
