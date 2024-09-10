import express from 'express';
import allRouter from './router/connect.router.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}))


// read cookies from the request

app.use(cookieParser());
app.use(cors());

app.use(morgan("dev"))



app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use("/api", allRouter);



app.use("*", (req, res) => {

  return res.status(404).json({
    success: false,
    message: "this path is not available in our servers ",
    
  })

})



export default app;