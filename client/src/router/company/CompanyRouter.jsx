import { Route, Routes } from "react-router-dom";
import CompanyDashboard from "../../company/CompanyDashboard/CompanyDashboard";

const CompanyRouter = () => {
    return (
        <Routes> 
            <Route path="../../company/dashboard/Componydashboard.jsx" element={<CompanyDashboard />} />
           
        </Routes>
    )
}
export default CompanyRouter;