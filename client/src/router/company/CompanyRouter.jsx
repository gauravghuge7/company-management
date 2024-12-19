import { Route, Routes } from "react-router-dom";
import CompanyDashboard from "../../company/CompanyDashboard/CompanyDashboard";
import CompanyLayout from "./CompanyLayout";
import TaskProjectList from "../../company/task/TaskProjectList";
import TaskList from "../../company/task/Tasklist";
import ProjectList from "../../company/project/Projectlist";

const CompanyRouter = () => {
    return (
        <Routes > 

            <Route path="/" element={<CompanyLayout />}>

                <Route path="/" element={<CompanyDashboard />} />
                <Route path="/dashboard" element={<CompanyDashboard />} />
                <Route path="/CompanyTasks" element={<TaskProjectList />} />

                <Route path="/task" element={<TaskList />} />

                <Route path="/project" element={<ProjectList />} />
            
            </Route>


    
        </Routes>
    )
}
export default CompanyRouter;