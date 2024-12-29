import  { useEffect, useState } from 'react'
import AdminNavbar from '../src/admin/navbar/AdminNavbar'
import Adminfooter from '../src/admin/footer/Adminfooter'
import Sidebar from '../src/admin/sidebar/Sidebar'
import Admincontain from '../src/admin/dashboard/Admincontain'
import NewEmployeeForm from '../src/admin/createemployee/NewEmployeeForm '
import EmployeeList from '../src/admin/createemployee/EmployeeList'
import TeamList from '../src/admin/createteam/TeamList' 
import CreateTeamForm from '../src/admin/createteam/CreateTeamForm'
import CompanyList from '../src/admin/createcompony/CompanyList'
import CreateCompany from '../src/admin/createcompony/Createcomponyform'
import AssignTaskForm from '../src/admin/assigntask/AssignTaskForm'
import TaskList from '../src/admin/assigntask/TaskList'
import { message } from 'react-message-popup'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addEmployee } from '../src/Redux/reducers'
import ProjectList from '../src/admin/CreateProject/ProjectList'
import { addTeam } from '../src/Redux/team.reducer'
import { addClient } from '../src/Redux/client.reducer'
import CreateProjectForm from '../src/admin/createcompony/CreateProjectForm'

function Admindashboard() {

    const [value, setValue] = useState(""); 








  /// for setting up the company to create the project


  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  




    


  return (
    <>
    <AdminNavbar />

    
    <div className="d-flex">
    <Sidebar setValue={setValue} />
      <div className="flex-grow-1 p-3">
      


      {/* { value === "employee" && <EmployeeList setValue={setValue}  /> }
      
      { value === "" && <Admincontain /> } */}


      {/* { value === "dashboard" && <Admincontain /> }
      { value === "createEmployee" && <NewEmployeeForm fetchEmployees={fetchEmployees}  /> } */}


      {/* { value === "team" && <TeamList  setValue={setValue} /> }
      { value === "createteam" && <CreateTeamForm /> } */}


      {/* {value === "compony" && <CompanyList setValue={setValue} setClientId={setClientId} setClientName={setClientName} /> }



      { value === "createcompany" && <CreateCompany /> } */}


      {/* {value === "assigntask" && <AssignTaskForm /> }
      { value === "task" && <TaskList setValue={setValue} /> } */}
      
      { value === "project" && <ProjectList setValue={setValue} /> }




      { 
        value === "addproject" && <CreateProjectForm clientId={clientId}  clientName={clientName} /> 
      }
    
      </div>

    </div>
    
    
    <Adminfooter />
    
    
    </>

  )
}

export default Admindashboard;

