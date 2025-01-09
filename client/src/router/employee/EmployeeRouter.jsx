import { Route, Routes } from "react-router-dom";
import Employeedashboard from "../../employee/dashboard/Employeedashboard";
import EmployeeTemplate from "./EmployeeTemplate";
import Employeecontain from "../../employee/dashboard/Employeecontain";
import LeadTeam from "../../employee/TeamLead/LeadTeam";
import LeadProjects from "../../employee/TeamLead/LeadProjects";
import ProjectSection from "../../employee/TeamLead/ProjectSection";
import TaskList from "../../employee/task/Task";
import EmpProjects from "../../employee/EmployeeProjects/EmpProjects";

const EmployeeRouter = () => {
    return (
        <Routes> 
            
            <Route path="/" element={<EmployeeTemplate />}>

                <Route path="/" element={<Employeecontain />} />
                <Route path="/dashboard" element={<Employeecontain />} />

                <Route path="/EmployeeTasks" element={<TaskList />} />

                <Route path="/projects" element={<EmpProjects />} />

                <Route path="/teamlead" element={<LeadTeam />} />
                <Route path="/leadprojects/:teamId" element={<LeadProjects />} />
                <Route path="/viewteamleadproject/:teamId/:projectId" element={<ProjectSection />} />

            </Route>
            
        </Routes>
    )
}

export default EmployeeRouter;