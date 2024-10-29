import express from 'express';
import { 
    createProject,
    createTeams, 
    getAdmin, 
    getAllClients, 
    getAllProjects, 
    getAllTeams, 
    getTotalEmployeeDetails, 
    loginAdmin, 
    logoutAdmin, 
    registerAdmin 
} from '../controller/admin.controller.js';

import { upload } from '../middleware/multer.middleware.js';
import { verifyAdmin } from '../middleware/Admin.middleware.js';
import { getEmployeeDetails } from '../controller/admin.pipeline.controller.js';
import { deleteEmployee, editEmployee } from '../controller/employee.manage.controller.js';

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

adminRouter.route(`/deleteEmployee/:employeeId`).delete(
    verifyAdmin,
    deleteEmployee
)


/* MongoDB Pipelines Testing Routes */

// adminRouter.route("/totalEmployees").get(
//     verifyAdmin,
//     getEmployeeDetails

// )



export default adminRouter;

