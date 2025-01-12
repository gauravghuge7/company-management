import mongoose from 'mongoose';



const connectionString = "mongodb://localhost:27017/myFirstDatabase";


const connectDB = async () => {

   try {

      const connect = await mongoose.connect(connectionString, {
     
      });

      console.log(` MongoDB connected successfully: ${connect.connection.host}`);
      
   } 
   catch (error) {
      
      console.log(error);
      process.exit(1);
   }
}


export default connectDB;