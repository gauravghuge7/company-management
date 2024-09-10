import { useState } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { message } from 'react-message-popup';




const CreateProjectForm = ({ clientId, clientName}) => {


   const [formData, setFormData] = useState({

      projectName: '',
      companyName: '',
      spokePersonEmail: '',
      spokePersonName: '',
      spokePersonNumber: '',
      description: '',
      team: " team",
      projectId: "",
      document: "",
      file: ""
   });

   const data = new FormData();


   // get data from the redux store
   const teams = useSelector(state => state.teamReducer.team);

   console.log("teams => ", teams);




   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };


   const onImageChange = (e) => {
      console.log(e.target.files[0]);
      setFormData({ ...formData, file: e.target.files[0] });
   };

   const handleSubmit = async(e) => {
      e.preventDefault();


      const body = {
         projectName: formData.projectName,
         companyName: formData.companyName,
         spokePersonEmail: formData.spokePersonEmail,
         spokePersonName: formData.spokePersonName,
         spokePersonNumber: formData.spokePersonNumber,
         description: formData.description,
         team: formData.team,
         projectId: formData.projectId,
         document: data.document,
         client: clientId,
         clientName: clientName,
         file: formData.file
      }
   



      const config = {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
         withCredentials: true,
      }


      const response = await axios.post("/api/admin/project", body, config);
      
      console.log("response => ", response);

      if(response.data.success === true) {
         message.success(response.data.message);
      }

   
   };

   return (
      <div className="container mt-5">
         
         <header className='flex gap-12 text-center'> 
    <h2 className="display-6">Create New Project <b>{clientName}</b></h2>
</header>
         
         <br/>

         <form onSubmit={handleSubmit}>

            {/**   */}
            <div className="mb-3">
               <label htmlFor="projectId" className="form-label">Project ID</label>
               <input
                  type="tel"
                  className="form-control"
                  id="projectId"
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  required
               />
            </div>

            <div className="mb-3">
               <label htmlFor="projectName" className="form-label">Project Name</label>
               <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  required
               />
            </div>

          


            <div className="mb-3">
               <label htmlFor="companyName" className="form-label">Client Name</label>
               <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  name="companyName"
                  value={clientName}
                  onChange={handleChange}
                  required
               />
            </div>
            <div className="mb-3">
               <label htmlFor="spokePersonName" className="form-label">Spokesperson Name</label>
               <input
                  type="text"
                  className="form-control"
                  id="spokePersonName"
                  name="spokePersonName"
                  value={formData.spokePersonName}
                  onChange={handleChange}
                  required
               />
            </div>

            <div className="mb-3">
               <label htmlFor="spokePersonEmail" className="form-label">Spokesperson Email</label>
               <input
                  type="email"
                  className="form-control"
                  id="spokePersonEmail"
                  name="spokePersonEmail"
                  value={formData.spokePersonEmail}
                  onChange={handleChange}
                  required
               />
            </div>
             
            <div className="mb-3">
               <label htmlFor="spokePersonNumber" className="form-label">Spokesperson Number</label>
               <input
                  type="tel"
                  className="form-control"
                  id="spokePersonNumber"
                  name="spokePersonNumber"
                  value={formData.spokePersonNumber}
                  onChange={handleChange}
                  required
               />
            </div>



            

            
            <div className='mb-3'>
               <label htmlFor="team" className="form-label">Team</label>
               <select
                  className="form-select"
                  id="team"
                  name="team"
                  value={formData.team}
                  onChange={handleChange}
                  required
               >
                  <option value="team">Select Team</option>
                  {
                     teams.map((team, index) => (
                        <option key={index} value={team._id}>{team.teamName}</option>
                     ))
                  }
                  
                  
               </select>

            </div>

           



            <div>

               <section>
                  <label> Project Description </label>
                  <textarea 
                     cols="50" 
                     className='w-full border p-2 mb-4'
                     placeholder="Add text to the slide"
                     value={formData.description}
                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  >
                  </textarea>
               </section>


               <div>
                  <label> Select Document </label>
                  <br/>
                  <input 
                     type="file"
                     onChange={onImageChange} 
                     accept='*'
                  />
                  <br/>
               </div>



            </div>

            <br/>
            
            










            {/*** 
            <div className="mb-3">
               <label htmlFor="description" className="form-label">Project Description</label>
               
                                 
                  <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        onChange={newContent => setContent(newContent)}

                  /> 
                        
            </div>
            */}


            




            
            <button type="submit" className="btn btn-primary">Submit</button>
         </form>
      </div>
   );
};

export default CreateProjectForm;
