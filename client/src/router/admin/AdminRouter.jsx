import { Route, Routes } from "react-router-dom"

import CompanyDashboard from "../../company/CompanyDashboard/CompanyDashboard";
import Employeedashboard from "../../employee/dashboard/Employeedashboard";

import EmployeeList from "../../admin/createemployee/EmployeeList";
import AdminContain from "../../admin/dashboard/Admincontain";
import NewEmployeeForm from "../../admin/createemployee/NewEmployeeForm ";
import TeamList from "../../admin/createteam/TeamList";
import CreateTeamForm from "../../admin/createteam/CreateTeamForm";
import CompanyList from "../../admin/createcompony/CompanyList";
import AssignTaskForm from "../../admin/assigntask/AssignTaskForm";
import TaskList from "../../admin/assigntask/TaskList";
import ProjectList from "../../admin/CreateProject/ProjectList";
import CreateProjectForm from "../../admin/createcompony/CreateProjectForm";
import CreateCompanyForm from "../../admin/createcompony/Createcomponyform";
import AdminLayout from "./AdminLayout";

const AdminRouter = () => {
  return (
    <Routes>

        <Route path="/" element={<AdminLayout />}>

        

        {/*  Base Path of Admin  */}
      <Route path="/" element={<AdminContain />} />
        
        


      {/*  All Admin Routing  */}

      {/*  Employee Routing  */}
      <Route path="/employee" element={<EmployeeList />} />

      <Route path="createEmployee" element={<NewEmployeeForm fetchEmployees={fetchEmployees}  />} />
        


      {/*  Team Routing  */}
      <Route path="/team" element={<TeamList  setValue={setValue} />} />
        <Route path="/createteam" element={<CreateTeamForm />} />


      {/*  Company Routing  */}
        <Route path="/company" element={<CompanyList setValue={setValue} setClientId={setClientId} setClientName={setClientName} />} />
        <Route path="/createcompany" element={<CreateCompanyForm />} />

        
        {/*  Assign Task Routing  */}
        <Route path="/assigntask" element={<AssignTaskForm />} />
        <Route path="/task" element={<TaskList setValue={setValue} />} />


        {/*  Project Routing  */}
        <Route path="/project" element={<ProjectList setValue={setValue} />} />
        <Route path="/addproject" element={<CreateProjectForm clientId={clientId}  clientName={clientName} />} /> 
        
      

        </Route>
    </Routes>
  );
};  

export default AdminRouter;