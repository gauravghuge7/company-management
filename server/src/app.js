import express from 'express';
import allRouter from './router/connect.router.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

import dotenv from 'dotenv';

dotenv.config({
  path: './.env'
})

app.use(express.json());
app.use(express.urlencoded({extended: true}))


// read cookies from the request

app.use(cookieParser());

const allowedOrigins = process.env.CLIENT_URL;

// const allowedOrigins = "http://localhost:5173";

// const allowedOrigins = "http://localhost:3000";

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins?.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "Origin",
    "X-Requested-With",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers"
  ],
  exposedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Credentials",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Headers"
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));



// Handle preflight requests for all routes
app.options('*', cors()); // Automatically handles preflight requests



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