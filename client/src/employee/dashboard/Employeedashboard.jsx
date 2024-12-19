import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { message } from 'react-message-popup';

import EmpProjects from '../EmployeeProjects/EmpProjects';
import Employeenavbar from '../navbar/Employeenavbar';
// import { Navbar } from 'react-bootstrap'
import EmployeeSidebar from '../sidebar/EmployeeSidebar';
import Task from '../task/Task';
import LeadProjects from '../TeamLead/LeadProjects';
import LeadTeam from '../TeamLead/LeadTeam';
import ProjectSection from '../TeamLead/ProjectSection';
import Employeecontain from './Employeecontain';
import Adminfooter from '../footer/Adminfooter';

function Employeedashboard() {

  const [conditionalComponent, setConditionalComponent] = useState("");

  const [projectId, setProjectId] = useState("");

  const [teamId, setTeamId] = useState("");
  


  const getEmployeeDetails = async() => {
    try {
      const response = await axios.get('/api/employee/getEmployeeDetails');
      console.log("response => ", response);

      if(response.data.success === true) {
        message.success(response.data.message);


      }
      
    
    } 
    catch (error) {
      message.error(error.message);  
    }
  }


  useEffect(() => {
    getEmployeeDetails();
  },[])



  return (
    <>
      <Employeenavbar/>


    <div className="d-flex">

      <EmployeeSidebar setConditionalComponent={setConditionalComponent} />
        
        
      <div className="flex-grow-1 p-3">


        {/* {conditionalComponent === "TaskList" && <Task />}
        {conditionalComponent === "" && <Employeecontain/>}
        {conditionalComponent === "Contain" && <Employeecontain/>}

        {conditionalComponent === "projects" && <EmpProjects />}



        {conditionalComponent === "teamLead" && <LeadTeam setConditionalComponent={setConditionalComponent} setTeamId={setTeamId}/>}


        {conditionalComponent === "teamLeadProjects" && <LeadProjects setConditionalComponent={setConditionalComponent} teamId={teamId} setProjectId={setProjectId}/>}

        {conditionalComponent === "viewTeamLeadProject" && <ProjectSection setConditionalComponent={setConditionalComponent} projectId={projectId}/>}
        
       */}

        

      </div>



    </div>
    
    
    
    <Adminfooter />
    
    
    </>
  )
}

export default Employeedashboard