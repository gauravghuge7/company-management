import axios from 'axios';
import { useEffect, useState } from 'react';

const ProjectSection = ({setConditionalComponent, projectId}) => {


   const [projects, setProjects] = useState(
      
      {
         projectName: "Project Name",
         clientName: "Client Name",
         description: "Description",   
         spokePersonName: "Spoke Person Name",
         spokePersonNumber: 1234567890,
         spokePersonEmail: "Spoke Person Email",

         projectId: "Project Id",

         
      }

   );



   const [team, setTeam] = useState({
      
      teamId: "Team Id",
      teamName: "Team Name",
      createdAt: ""
   })


   const [employeeDetails, setEmployeeDetails] = useState([{

      employeeName: "Employee Name",
      employeeEmail: "Employee Email",
      designation: "Designation",
      
      _id: "Employee Id",


   }]);


   const fetchProjects = async() => {

      console.log("projectId => ", projectId);

   
      
      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
         withCredentials: true,
      }


      try {

         const response = await axios.get(`/api/employee/fetchProjectById/${projectId}`, config);

         console.log("response.data => ", response.data);  
         
         
         if(response.data.success === true) {

         //  response.data.data
            setProjects(response?.data?.data[0]);

            setTeam(response?.data?.data[0]?.team[0]);

            console.log("employee => ", response?.data?.data[0]?.team[0].employeeDetails)
            

            setEmployeeDetails(response?.data?.data[0]?.team[0].employeeDetails);

         }
         
      } 
      catch (error) {
      
         console.log(error);
      }

   }

   useEffect(() => {

      fetchProjects();

   }, [])




   return (
      <div>

         <button onClick={() => setConditionalComponent("teamLead")}>
            Back
         </button>
         
         <nav className=''>

            <section
               className='shadow-md shadow-gray-500/50 rounded-lg'
            >
               <h2>Project Section</h2>

               <div>
                        
                  <h3>{projects.projectName}</h3>
                  <p>{projects.description}</p>
                  <p>{projects.spokePersonName}</p>
                  <p>{projects.spokePersonNumber}</p>
                  <p>{projects.spokePersonEmail}</p>


               </div>


            </section>


         </nav>

         
         

         <main className='mt-5 shadow-md shadow-gray-500/50 p-4 rounded-lg '>
         
            <legend>Team Details</legend>

            <div>
               
               <h3>{team.teamName}</h3>
               <p>{team.teamId}</p>
               <p>{team.createdAt}</p>
            
            
            </div>

         </main>



         <details name='employeeDetails'>
            <legend>Employee Details</legend>
         
            <main className='mt-5 shadow-md shadow-gray-500/50 p-4 rounded-lg '>
               
               {
                  employeeDetails.map((employee, index) => (
                     <div key={index}>
                        <h3>{employee.employeeName}</h3>
                        <p>{employee.employeeEmail}</p>
                        <p>{employee.designation}</p>
                  
                     </div>
                  ))
               }
               
               
               
            </main>
         
         
         
         </details>

         


         
      </div>
   );
}

export default ProjectSection;

