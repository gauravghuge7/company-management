import axios from 'axios';
import { useEffect, useState } from 'react';

const LeadTeam = ({ setConditionalComponent, setTeamId }) => {
   const [teams, setTeams] = useState([{
      teamLead: "",
      teamName: "",
      teamId: "",
      _id: "",
   }]);

   const fetchTeams = async () => {
      try {
         const response = await axios.get(`/api/employee/isTeamLead`);
         console.log("response.data => ", response.data);

         if (response.data.success === true) {
            console.log("response.data.data => ", response.data.data);
            setTeams(response.data.data);
         }
      } catch (error) {
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
         <h2 className="text-center">Teams That You Are Leading</h2>
         <hr />
         <div className="container">
            <div className="row">
               {
                  teams?.map((team, index) => (
                     <div 
                        key={index}
                        className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                     >
                        <div className="card shadow-sm">
                           <div className="card-body">
                              <h5 className="card-title text-center">{team.teamName}</h5>
                              <h6 className="card-subtitle mb-2 text-muted">{team.teamId}</h6>
                              <button
                                 className="btn btn-primary"
                                 onClick={() => setTeamOfProject(team._id)}
                              >
                                 View this team Projects
                              </button>
                           </div>
                        </div>
                     </div>
                  ))
               }
            </div>
         </div>
      </div>
   );
}

export default LeadTeam;
