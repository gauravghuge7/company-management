import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { message } from 'react-message-popup';
import axios from 'axios';

const EmployeeSidebar = ({ setConditionalComponent, isTeamLead }) => {

  const [teams, setTeams] = useState([{
    teamLead: ""
  }]);

  const checkTeamLeadOrNot = async () => {
    try {
      const response = await axios.get(`/api/employee/isTeamLead`);
      console.log(response.data);

      if (response.data.success === true) {
        setTeams(response.data.data);
      }
      
    } catch (error) {
      console.log(error);
      message.error("You are not a Team Lead");
    }
  }

  useEffect(() => {
    checkTeamLeadOrNot();
  }, [])

  return (
    <div className="d-flex flex-column p-3 bg-dark text-light" style={{ width: '250px', height: 'auto', minHeight: '100vh' }}>
     
      <hr className="bg-light" />
      <Nav className="flex-column">
        <button 
          onClick={() => setConditionalComponent("Contain")} 
          className="btn btn-dark mb-2 d-flex align-items-center"
        >
          <i className="bi bi-speedometer2 me-2"></i> Dashboard
        </button>
        <button 
          onClick={() => setConditionalComponent("projects")} 
          className="btn btn-dark mb-2 d-flex align-items-center"
        >
          <i className="bi bi-briefcase me-2"></i> Project Section
        </button>
        <button 
          onClick={() => setConditionalComponent("TaskList")} 
          className="btn btn-dark mb-2 d-flex align-items-center"
        >
          <i className="bi bi-list-task me-2"></i> Tickets
        </button>
        {teams?.length > 0 && 
          <button 
            onClick={() => setConditionalComponent("teamLead")} 
            className="btn btn-dark mb-2 d-flex align-items-center"
          >
            <i className="bi bi-person-check me-2"></i> Team Lead Section
          </button>
        }
      </Nav>
    </div>
  );
};

export default EmployeeSidebar;
