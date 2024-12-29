import { Route, Routes } from "react-router-dom"


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
        <Route path="dashboard" element={<AdminContain />} />
          
          


        {/*  All Admin Routing  */}

        {/*  Employee Routing  */}
        <Route path="/employee" element={<EmployeeList />} />

        <Route path="createEmployee" element={<NewEmployeeForm />} />
        


        {/*  Team Routing  */}
        <Route path="/team" element={<TeamList  />} />
        <Route path="/createteam" element={<CreateTeamForm />} />


          {/*  Company Routing  */}
        <Route path="/company" element={<CompanyList  />} />
        <Route path="/createcompany" element={<CreateCompanyForm />} />

          
          {/*  Assign Task Routing  */}
          <Route path="/assigntask" element={<AssignTaskForm />} />
          <Route path="/task" element={<TaskList />} />


          {/*  Project Routing  */}
          <Route path="/project" element={<ProjectList  />} />
          <Route path="/addproject/:clientId/:clientName" element={<CreateProjectForm  />} />
          
      

        </Route>
    </Routes>
  );
};  

export default AdminRouter;