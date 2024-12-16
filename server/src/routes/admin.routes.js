import express from 'express';


import { upload } from '../middleware/multer.middleware.js';
import { verifyAdmin } from '../middleware/Admin.middleware.js';

import { getAdmin, loginAdmin, logoutAdmin, registerAdmin } from '../controller/Admin/admin.controller.js';


import { getTotalEmployeeDetails } from '../controller/Admin/employee.controller.js';

import { getAllClients } from '../controller/Admin/client.controller.js';
import { createTeams, getAllTeams } from '../controller/Admin/team.controller.js';
import { createProject, getAllProjects } from '../controller/Admin/project.controller.js';
import { deleteEmployee, editEmployee } from '../controller/Employee/employee.manage.controller.js';
import { deleteClient, editClient } from '../controller/Client/client.manage.controller.js';

const adminRouter = express.Router();


// register the admin 
adminRouter.route("/register").post(

    upload.none(),
    registerAdmin
)

// login the admin 
adminRouter.route("/login").post(
    upload.none(),
    loginAdmin
)

// logout the admin
adminRouter.route("/logout").post(

    verifyAdmin,
    logoutAdmin
)


adminRouter.route("/getAdmin").get(

    verifyAdmin,
    getAdmin
)


// get the total employees
adminRouter.route("/totalEmployees").get(
    verifyAdmin,
    getTotalEmployeeDetails

)

// get the total clients
adminRouter.route("/getAllClients").get(
    verifyAdmin,
    getAllClients
)
    
// create the teams
adminRouter.route("/createTeams").post(
    verifyAdmin,
    upload.none(),
    createTeams
)

// get all the teams
adminRouter.route("/getAllTeams").get(
    verifyAdmin,
    getAllTeams
)





adminRouter.route("/project")
.post(
    verifyAdmin,
    upload.single("file"),
    createProject
)

.get(
    verifyAdmin,
    getAllProjects
)



adminRouter.route(`/updateEmployee/:employeeId`).put(
    verifyAdmin,
    upload.none(),
    editEmployee
)
adminRouter.route(`/editClient/:_id`).put(
    verifyAdmin,
    upload.none(),
    editClient
)

adminRouter.route(`/deleteEmployee/:employeeId`).delete(
    verifyAdmin,
    deleteEmployee
)

adminRouter.route(`/deleteClient/:_id`).delete(
    verifyAdmin,
    deleteClient

)







export default adminRouter;

