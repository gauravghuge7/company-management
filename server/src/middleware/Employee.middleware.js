import jwt from 'jsonwebtoken';

const verifyEmployee = async (req, res, next) => {

   try {

      const employeeAccessToken = req.cookies.employeeAccessToken;

      if(!employeeAccessToken) {
         return res.status(401).json({
            message: 'unauthorized employee '
         })
      }

      const decode = await jwt.verify(employeeAccessToken, process.env.EMPLOYEE_ACCESS_SECRET_KEY);


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
   verifyEmployee
}

/*


(req, res) => {
   
   const {employeeEmail} = req.user;
   
} 




*/