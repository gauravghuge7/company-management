import express from 'express';

import {
   createProject,
   createTicket,
   fetchProjects,
   fetchTasks,
   loginClient,
   logoutClient,
   registerClient,
} from '../controller/client.controller.js';
import { verifyAdmin } from '../middleware/Admin.middleware.js';
import { verifyClient } from '../middleware/Compony.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

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