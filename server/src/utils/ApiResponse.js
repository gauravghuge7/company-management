

// This is the response object
class ApiResponse {

   constructor(status, message, data, anythingElse) {

      this.status = status;
      this.message = message;
      this.data = data;
      this.success = status < 400;
      this.anythingElse = anythingElse;



   }
}

export {
   ApiResponse
}


/* 

  .json(
  
     new ApiResponse(200, "employee registered successfully", employee)
  )


*/
