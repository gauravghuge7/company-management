

// this page is using the error handling method



class ApiError extends Error {

   constructor(
      statusCode,
      message="something went wrong",
      stack="",
      error=[]
  ) 
  {
      super(message);

      this.statusCode = statusCode;
      this.success =  false;

      this.error = message;
   
   
      

      if(stack) {
          this.stack = stack;
      }

      else {
          Error.captureStackTrace(this, this.constructor);
      }

   } 
}


export {
   ApiError
}  