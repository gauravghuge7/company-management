import express from 'express';


import { verifyAdmin } from '../middleware/Admin.middleware.js';
import { verifyClient } from '../middleware/Compony.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
import { getClient, loginClient, logoutClient, registerClient } from '../controller/Client/client.controller.js';
import { createProject } from '../controller/Admin/project.controller.js';
import { fetchProjects } from '../controller/Client/client.project.controller.js';
import { createTicket, fetchTasks } from '../controller/Client/client.task.controller.js';

const clientRouter= express.Router();
      

// this is the route for registering a client   

clientRouter.route("/register").post(
   verifyAdmin,
   upload.none(),
   registerClient
)

clientRouter.route("/login").post(
   upload.none(),
   loginClient
)

clientRouter.route("/logout").post(
   verifyClient,
   logoutClient
)

clientRouter.route("/createProject").post( //verify client
   verifyClient,
   upload.none(),
   createProject
)



clientRouter.route("/fetchProjects").get( //verify client   
   verifyClient,   
   fetchProjects
)

clientRouter.route("/getClient").get( //verify client   
   verifyClient,   
   getClient
)


clientRouter.route("/fetchTasks/:projectId").get( //verify client   
   verifyClient,   
   fetchTasks
)  


clientRouter.route("/createTicket").post( //verify client   
   verifyClient,
   upload.single("document"),
   createTicket
)



export default clientRouter;