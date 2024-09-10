import { Route, Routes } from "react-router-dom";
import Employeedashboard from "../../employee/dashboard/Employeedashboard";

const EmployeeRouter = () => {
    return (
        <Routes> 
            <Route path="/employee/dashboard" element={<Employeedashboard   />} />
            
        </Routes>
    )
}

export default EmployeeRouter;