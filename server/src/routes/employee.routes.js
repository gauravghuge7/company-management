import express from 'express';

import {
  fetchProjectById,
  fetchProjectByTeamId,
  getEmployeeDetails,
  getEmployeeProjects,
  getTeamLeadOrNot,
  getTeamLeadProjects,
  loginEmployee,
  logoutEmployee,
  registerEmployee,
} from '../controller/employee.controller.js';
import { verifyAdmin } from '../middleware/Admin.middleware.js';
import { verifyEmployee } from '../middleware/Employee.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const employeeRouter = express.Router();


employeeRouter.route("/register").post(
    verifyAdmin,
    upload.none(),
    registerEmployee
)


employeeRouter.route("/login").post(
    upload.none(),
    loginEmployee
)

employeeRouter.route("/logout").post(
    
    verifyEmployee,
    logoutEmployee
)

employeeRouter.route("/getEmployeeDetails").get(
    
    verifyEmployee,
    getEmployeeDetails
)

employeeRouter.route("/isTeamLead").get(
    
    verifyEmployee,
    getTeamLeadOrNot
)

employeeRouter.route("/getProjects").get(
    
    verifyEmployee,
    getEmployeeProjects
)

employeeRouter.route("/getTeamLeadProjects").get(
    
    verifyEmployee,
    upload.none(),
    getTeamLeadProjects
)

employeeRouter.route("/fetchProjectById/:projectId").get(
    
    verifyEmployee,
    upload.none(),
    fetchProjectById
)


employeeRouter.route("/fetchProjectByTeamId/:teamId").get(
    
    verifyEmployee,
    upload.none(),
    fetchProjectByTeamId
)






employeeRouter.route("/getEmployeePassword").get(
    
)



export default employeeRouter;