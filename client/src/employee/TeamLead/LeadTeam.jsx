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
    <div
      style={{
        backgroundColor: '#f9fafc',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        marginTop: '30px',
      }}
    >
      <h2 className="text-center" style={{ color: '#1a1a1a', fontWeight: '700', letterSpacing: '1px' }}>
        Teams That You Are Leading
      </h2>
      <hr style={{ borderTop: '3px solid #007BFF', width: '60%', margin: '20px auto' }} />
      <div className="container">
        <div className="row">
          {teams?.map((team, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div
                className="card shadow-sm"
                style={{
                  borderRadius: '16px',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  overflow: 'hidden',
                }}
              >
                <div
                  className="card-body"
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '20px',
                    textAlign: 'center',
                    borderRadius: '16px',
                  }}
                >
                  <h5
                    className="card-title"
                    style={{ color: '#333', fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '10px' }}
                  >
                    {team.teamName}
                  </h5>
                  <h6
                    className="card-subtitle text-muted"
                    style={{ fontSize: '0.875rem', marginBottom: '20px' }}
                  >
                    ID: {team.teamId}
                  </h6>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => setTeamOfProject(team._id)}
                    style={{
                      borderRadius: '8px',
                      fontWeight: '600',
                      transition: 'background-color 0.3s, transform 0.2s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#0056b3';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#007bff';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    View Team
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
