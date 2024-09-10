import { useEffect, useState } from 'react';
import axios from 'axios';



const TaskProjectlist = ({setConditionalComponent, setProjectId}) => {

   

   const [projectData, setProjectData] = useState([
      {
         projectName: 'Example Project',
        
         spokePersonEmail: 'example@example.com',
         spokePersonName: 'John Doe',
         spokePersonNumber: '123-456-7890',
         description: 'This is an example project description.',
         teamLead: 'John Doe',
      },

   ]);

   


   const getProjects = async () => {
      try {
         const response = await axios.get('/api/client/fetchProjects');
         console.log(response.data);
         

         if(response.data.success) {

            setProjectData(response.data.data);
         }
 
      } 
      catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getProjects();
   }, []);



   const sendProjectId = (Id) => {

      setProjectId(Id);
      setConditionalComponent('tasklist');

   }



   

   return (
      <div className="container mt-5">

         

         <h2 className="mb-4 text-center">Project List</h2>
         <table className="table table-striped table-bordered">
            <thead>
               <tr>
                  <th>Project Name</th>

                  <th>Spokesperson Email</th>
                  <th>Spokesperson Name</th>
                  <th>Spokesperson Number</th>
                  <th>Team Lead</th>
                  <th>Description</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>

               {
                  projectData.map((data, index) => (
                     <tr key={index}>
                        <td>{data.projectName}</td>

                        <td>{data.spokePersonEmail}</td>
                        <td>{data.spokePersonName}</td>
                        <td>{data.spokePersonNumber}</td>
                        <td>{data.teamLead}</td>
                        <td>{data.description}</td>
                        <td>
                           <button 
                              className="btn btn-primary me-2" 
                              onClick={() => sendProjectId(data._id)}
                           >
                           
                              View Tasks
                           </button>

                           
                        </td>
                     </tr>
                  ))
               }
            </tbody>
         </table>
      </div>
   );
};

export default TaskProjectlist;