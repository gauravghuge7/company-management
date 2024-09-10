import axios from 'axios';
import { useEffect, useState } from 'react';

const LeadTeam = ({setConditionalComponent, setTeamId}) => {


   const [teams, setTeams] = useState([{

      teamLead: "",
      teamName: "",
      teamId: "",
      _id: "",

   }]);


   const fetchTeams = async() => {

         try {

            const response = await axios.get(`/api/employee/isTeamLead`);
            console.log("response.data => ", response.data);



            if(response.data.success === true) {
               console.log("response.data.data => ", response.data.data);
               setTeams(response.data.data);
            }
            
         } 
         catch (error) {
            console.log(error);
         }
   }


   useEffect(() => { 
      fetchTeams();
   }, [])

   
   const setTeamOfProject = (teamId) => {


      setTeamId(teamId);
      setConditionalComponent("teamLeadProjects")
   }


   return (
      <div>

         <h2> Teams That You Are Leading</h2>
         <hr />
         <main className="flex flex-wrap justify-center gap-6 sm:gap-x-4 lg:gap-x-8">
            {
               teams?.map((team, index) => (
                  <div 
                     key={index}
                     className="mb-3 p-3 w-[25rem] bg-light shadow-md shadow-gray-500/50 rounded-lg"
                  >
                     <h3 className="text-center">{team.teamName}</h3>
                     <h3>{team.teamId}</h3>

                     <button
                        onClick={() => setTeamOfProject(team._id)}
                     >
                        View this team Projects
                     </button>
                  </div>
               ))
            }
         
         </main>
         
      </div>
   );
}

export default LeadTeam;
