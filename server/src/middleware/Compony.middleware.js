import jwt from 'jsonwebtoken';

const verifyClient = async (req, res, next) => {

   try {

      const clientAccessToken = req.cookies.clientAccessToken;

      if(!clientAccessToken) {
         return res.status(401).json({
            message: 'unauthorized client'
         })
      }

      const decode = await jwt.verify(clientAccessToken, process.env.CLIENT_ACCESS_SECRET_KEY);


      req.user = decode;


      next();

   } 
   catch (error) {
      console.log(error);
      return res.status(401).json({
         message: 'unauthorized employee '
      })
   }

}

export {
   verifyClient
}

/*


(req, res) => {
   
   const {clientEmail} = req.user;
   
} 




*/