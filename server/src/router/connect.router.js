import express from 'express';
import employeeRouter from '../routes/employee.routes.js';
import adminRouter from '../routes/admin.routes.js';
import clientRouter from '../routes/client.routes.js';



const allRouter = express.Router();



allRouter.use("/employee", employeeRouter);       // this is the main router for employee

allRouter.use("/admin", adminRouter);             // this is the main router for admin

allRouter.use("/client", clientRouter);           // this is the main router for client



export default allRouter;
