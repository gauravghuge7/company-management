import  { useEffect, useState } from 'react'
import AdminNavbar from '../navbar/AdminNavbar'
import Adminfooter from '../footer/Adminfooter'
import Sidebar from '../sidebar/Sidebar'
import Admincontain from './Admincontain'
import NewEmployeeForm from '../createemployee/NewEmployeeForm '
import EmployeeList from '../createemployee/EmployeeList'
import TeamList from '../createteam/TeamList' 
import CreateTeamForm from '../createteam/CreateTeamForm'
import CompanyList from '../createcompony/CompanyList'
import CreateCompany from '../createcompony/Createcomponyform'
import AssignTaskForm from '../assigntask/AssignTaskForm'
import TaskList from '../assigntask/TaskList'
import { message } from 'react-message-popup'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addEmployee } from '../../redux/reducers'
import ProjectList from '../CreateProject/ProjectList'
import { addTeam } from '../../redux/team.reducer'
import { addClient } from '../../redux/client.reducer'
import CreateProjectForm from '../createcompony/CreateProjectForm'

function Admindashboard() {

    const [value, setValue] = useState(""); 

    const dispatch = useDispatch();

    // set the employees in redux
  const fetchEmployees = async() => {
    try {

      const response = await axios.get('/api/admin/totalEmployees');
      
      console.log("response => ", response);

      if(response.data.success === true) {
        message.success('Employees fetched successfully');
        dispatch(addEmployee(response.data.data));
      }
    
    } 
    catch (error) {
      message.error(error.message);  
    }
  }

  console.log("Documents => ",document.cookie)

  // set the teams in redux
  const fetchTeams = async() => {

    try {

      const response = await axios.get('/api/admin/getAllTeams');
      
      console.log("response => ", response);

      if(response.data.success === true) {

      dispatch(addTeam(response.data.data.team));
      message.success('Team fetched successfully');
      }
  
    } 
    catch (error) {
      message.error(error.message);  
    }
  }

  // set the clients in the redux
  const fetchCompanies = async () => {
    try {
        
      const response = await axios.get("/api/admin/getAllClients")      // this is the api call we are using the axios 

      console.log("response.data => ", response.data.data);

      if(response.data.success === true) {
        message.success(response.data.message);
        dispatch(addClient(response.data.data));
      }

    } 
    catch (error) {
      message.error(error.message);
    }
  }








  /// for setting up the company to create the project


  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  

  useEffect(() => {

    fetchEmployees();
    fetchTeams();
    fetchCompanies();

  },[])


    


  return (
    <>
    <AdminNavbar />

    
    <div className="d-flex">
    <Sidebar setValue={setValue} />
      <div className="flex-grow-1 p-3">
      


      { value === "employee" && <EmployeeList setValue={setValue}  /> }
      { value === "" && <Admincontain /> }
      { value === "dashboard" && <Admincontain /> }
      { value === "createEmployee" && <NewEmployeeForm fetchEmployees={fetchEmployees}  /> }
      { value === "team" && <TeamList  setValue={setValue} /> }
      { value === "createteam" && <CreateTeamForm /> }


      {value === "compony" && <CompanyList setValue={setValue} setClientId={setClientId} setClientName={setClientName} /> }



      { value === "createcompany" && <CreateCompany /> }
      {value === "assigntask" && <AssignTaskForm /> }
      { value === "task" && <TaskList setValue={setValue} /> }
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

export default Admindashboard

