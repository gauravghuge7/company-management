import axios from "axios";
import { useEffect, useState } from "react";

const EmpProjects = () => {


   const [projects, setProjects] = useState([
      {

         projectId: "",
         projectName: "",
         description: "",
         clientName: "",
         team: "",
         spokePersonName: "",
         spokePersonEmail: "",
         spokePersonNumber: "",
         createdAt: "",
         updatedAt: "",
      }


   ],
   
);


   const fetchProjects = async() => {

      try {


         const config = {
            headers: {
               'Content-Type': 'application/json',
            },
            withCredentials: true,
         }

         const response = await axios.get(`/api/employee/getProjects`, config);
         
         console.log(response.data);

         if(response.data.success === true){

            setProjects(response.data?.data[0]?.project);

            console.log("projects => ", projects);
         }


      } 
      catch (error) {
         console.log(error);
      }

   }

   useEffect(() => {
      fetchProjects();
   },[])


   if(!projects?.length || projects?.length === 0){
      return (
         <div className="flex flex-wrap justify-center gap-10">
            <h1>You are not working any project right now</h1>
         </div>
      )
   }



   return (
      <div 
         className="flex flex-wrap justify-center gap-10"
      > 

         {
            projects?.map((project, index) => (

               <div 
                  key={index}
                  className="mb-3 p-3 w-[25rem] bg-light shadow-md shadow-gray-500/50 rounded-lg"

               >
                  <h3 className="text-center">{project.clientName}</h3>

                  <h3>{project.projectName}</h3>

                  <p>{project.description}</p>
               
                  <button

                  >
                     View Your Work
                  
                  </button>



               </div>

            ))
         }
         
      </div>
   );
}

export default EmpProjects;
