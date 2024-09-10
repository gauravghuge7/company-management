import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { message } from 'react-message-popup';
import axios from 'axios';


const EmployeeSidebar = ({setConditionalComponent, isTeamLead}) => {



  // just for the team lead Access
  const [teams, setTeams] = useState([{

    teamLead: ""

  }]);



  const checkTeamLeadOrNot = async() => {

    try {

      const response = await axios.get(`/api/employee/isTeamLead`);

      console.log(response.data);


      if(response.data.success === true){
        setTeams(response.data.data);

      }
      
    } 
    catch (error) {
      console.log(error);
      message.error("You are not a Team Lead");
    }

  }


  useEffect(() => {
    checkTeamLeadOrNot();
  },[])




  return (
    <div className="d-flex flex-column vh-100 p-3 bg-light">
      <h2 className="mb-4">Employee Panel</h2>
      <hr />
      <Nav className="flex-column">

        <button 
          onClick={() => setConditionalComponent("Contain")} 
          className="mb-2"
        >
          <i className="bi bi-speedometer2"></i> Dashboard
        </button>

        

        <button onClick={() => setConditionalComponent("TaskList")} className="mb-2">
          <i className="bi bi-list-task"></i> Task
        </button>

        <button onClick={() => setConditionalComponent("projects")} className="mb-2">
            Project Section  
        </button>

        {
          teams?.length > 0 && 
          <button onClick={() => setConditionalComponent("teamLead")} className="mb-2">
            Team Lead Section   
      
          </button>
        }
      

      </Nav>
    </div>
  );
};

export default EmployeeSidebar;
