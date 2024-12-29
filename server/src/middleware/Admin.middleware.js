import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const verifyAdmin = asyncHandler(async (req, res, next) => {

   try {

      console.log("req.cookies => ", req.cookies)

      const adminAccessToken = req.cookies.adminAccessToken;

      if(!adminAccessToken) {
         throw new ApiError(401, "unauthorized admin ");

      }
 
      const decode = await jwt.verify(adminAccessToken, process.env.ADMIN_ACCESS_SECRET_KEY);


      req.user = decode;


      next();

   } 
   catch (error) {
      console.log(error);
      return res.status(401).json({
         message: 'unauthorized admin '
      })
   }

})

/*


(req, res) => {
   
   const {adminEmail} = req.user;
   
} 




*/