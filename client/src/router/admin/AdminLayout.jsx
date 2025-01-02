
import AdminNavbar from "../../admin/navbar/AdminNavbar"
import { Outlet } from "react-router-dom";
import Sidebar from "../../admin/sidebar/Sidebar";
import { setTeamData } from "../../Redux/SetDataToRedux/TeamData";
import { setClientData } from "../../Redux/SetDataToRedux/ClientData";
import { setEmployeeData } from "../../Redux/SetDataToRedux/EmployeeData";
import { useEffect } from "react";
const AdminLayout = () => {


   const fetchEmployees = setEmployeeData();
   const fetchCompanies = setClientData();
   const fetchTeams = setTeamData();
   
 
 
 useEffect(() => {
   fetchEmployees;
   fetchTeams;
   fetchCompanies;
 
 },[])
   


   return (
      <>
         <AdminNavbar />

      
         <div className="d-flex">
            
            <Sidebar />

            <div className="flex-grow-1 p-3">

               <Outlet />   
         
            </div>
   
         </div>
      
      
      
      </>
   )
}  

export default AdminLayout