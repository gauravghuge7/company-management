import express from 'express';



import { verifyAdmin } from '../middleware/Admin.middleware.js';
import { verifyEmployee } from '../middleware/Employee.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { loginUser } from '../controller/common.login.controller.js';

import { getEmployeeByTeam, getEmployeeDetails, logoutEmployee, registerEmployee } from '../controller/Employee/employee.controller.js';

import { getTeamLeadOrNot } from '../controller/Employee/employee.manage.controller.js';
import { fetchProjectById, forwardTicketsAndTasksToAnotherEmployee, getEmployeeAllTasks, getEmployeeProjects, getTasksByProjectId } from '../controller/Employee/employee.project.controller.js';
import { fetchProjectByTeamId, getTeamLeadProjects } from '../controller/TeamLead/teamlead.project.controller.js';
import { assignTasksToTeamMembers, getAllTasks, getTeamTasks } from '../controller/TeamLead/teamLead.controller.js';

const employeeRouter = express.Router();


employeeRouter.route("/register").post(
    verifyAdmin,
    upload.none(),
    registerEmployee
)


employeeRouter.route("/login").post(
    upload.none(),
    loginUser
)

// employeeRouter.route("/login").post(
//     upload.none(),
//     loginEmployee
// )

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




employeeRouter.route("/fetchTasks/:employee").get(
    
    verifyEmployee,
    upload.none(),
    getTeamTasks
)



employeeRouter.route("/assignTaskToEmployee").post(
    
    verifyEmployee,
    upload.single("document"),
    assignTasksToTeamMembers
)


employeeRouter.route("/getTasksByProjectId/:projectId").get(
    
    verifyEmployee,
    getTasksByProjectId
)


employeeRouter.route("/getAllTasks/:projectId").get(
    
    verifyEmployee,
    getAllTasks
)



employeeRouter.route("/forwardTicketsAndTasksToAnotherEmployee").post(
    
    verifyEmployee,
    upload.none(),
    forwardTicketsAndTasksToAnotherEmployee
)


employeeRouter.route("/getEmployeeByTeam/:teamId").get(

    verifyEmployee,
    getEmployeeByTeam
)


employeeRouter.route("/getEmployeeAllTasks").get(
    verifyEmployee,
    getEmployeeAllTasks
)





export default employeeRouter;