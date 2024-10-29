import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LeadTeam = ({ setConditionalComponent, setTeamId }) => {
  const [teams, setTeams] = useState([]);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`/api/employee/isTeamLead`);
      console.log("response.data => ", response.data);

      if (response.data.success) {
        console.log("response.data.data => ", response.data.data);
        setTeams(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const setTeamOfProject = (teamId) => {
    setTeamId(teamId);
    setConditionalComponent("teamLeadProjects");
  };

  return (
    <div style={{ backgroundColor: '#f0f4f8', padding: '40px', borderRadius: '12px', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)', marginTop: '30px' }}>
      <h2 className="text-center" style={{ color: 'black', fontWeight: 'bold' }}>Teams That You Are Leading</h2>
      <hr style={{ borderTop: '2px solid #007BFF', width: '50%', margin: 'auto' }} /> <br />
      <div className="container">
        <div className="row">
          {teams?.map((team, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card shadow-sm" style={{ borderRadius: '12px', transition: 'transform 0.2s' }}>
                <div className="card-body" style={{ backgroundColor: '#ffffff', borderRadius: '12px' }}>
                  <h5 className="card-title text-center" style={{ color: '#333', fontWeight: 'bold' }}>{team.teamName}</h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">{team.teamId}</h6>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setTeamOfProject(team._id)}
                    style={{
                      borderRadius: '8px',
                      transition: 'background-color 0.3s, transform 0.2s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#0056b3'; // Darker shade on hover
                      e.currentTarget.style.transform = 'scale(1.05)'; // Scale effect on hover
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#007bff'; // Original color
                      e.currentTarget.style.transform = 'scale(1)'; // Reset scale
                    }}
                  >
                    View 
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadTeam;
