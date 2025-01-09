

import { Outlet } from "react-router-dom";
import Employeenavbar from "../../employee/navbar/Employeenavbar";
import EmployeeSidebar from "../../employee/sidebar/EmployeeSidebar";


const EmployeeTemplate = () => {
   return (
      <>
         <Employeenavbar />
         <div className="d-flex">
            <EmployeeSidebar  />
            <div className="flex-grow-1 p-3">
               <Outlet />   
         
            </div>
   
         </div>   
      
      
      </>
   )
}  
export default EmployeeTemplate