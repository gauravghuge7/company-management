
import app from './app.js';
import connectDB from "./db/database.js"
import dotenv from 'dotenv';

dotenv.config({
   path: "./.env"
})


const PORT = 4000;    // this is the port number using the dynamically



connectDB() 

.then(() => {

   app.listen(PORT, () => {
      console.log(`         Server is running on port ${PORT} 
      \n                the Server is http://localhost:${PORT}      `);
   })

})

.catch((error) => {
   console.log("Error while connecting express app to database", error);
});



