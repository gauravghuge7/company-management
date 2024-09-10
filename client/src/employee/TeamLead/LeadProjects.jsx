import axios from "axios";
import { useEffect, useState } from "react";
import { message } from "react-message-popup";



const LeadProjects = ({setConditionalComponent, teamId, setProjectId}) => {


   




   const [projects, setProjects] = useState([

   ]);



   const fetchProjects = async() => {

      try {


         const config = {
            headers: {
               'Content-Type': 'application/json',
            },
            withCredentials: true,
         }

         const response = await axios.get(`/api/employee/fetchProjectByTeamId/${teamId}`, config);
         
         console.log("response.data => ", response.data);

         setProjects(response?.data?.data)
      } 
      catch (error) {
         console.log(error);
         message.error(error?.message);
      }

   }

   
   useEffect(() => {
      fetchProjects();

   },[])



   const handleProject = (projectId) => {

      setConditionalComponent("viewTeamLeadProject");

      console.log("projectId => ", projectId);
      setProjectId(projectId);
   
   }








   return (
      <div>

         <h2 className="text-center mb-8">Projects That You Are Leading</h2>

         <main className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            {
               projects?.map((project, index) => (
                  <div 
                     key={index}
                     className="mb-3 p-3 w-[25rem] bg-light shadow-md shadow-gray-500/50 rounded-lg"
                  >
                     <h3 className="text-center">{project.clientName}</h3>
                     <h3>{project.projectName}</h3>
                     <p>{project.description}</p>

                     <p>{project._id}</p>

                     <button
                        onClick={() => handleProject(project._id)}
                     >
                        View Your Work
                     </button>
                  </div>
               ))
            }
         
         </main>




         
         
      </div>
   );
}

export default LeadProjects;
