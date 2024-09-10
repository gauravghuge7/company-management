import jwt from 'jsonwebtoken';

export const verifyAdmin = async (req, res, next) => {

   try {

      console.log("req.cookies => ", req.cookies)

      const adminAccessToken = req.cookies.adminAccessToken;

      if(!adminAccessToken) {
         return res.status(401).json({
            message: 'unauthorized admin '
         })
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

}

/*


(req, res) => {
   
   const {adminEmail} = req.user;
   
} 




*/