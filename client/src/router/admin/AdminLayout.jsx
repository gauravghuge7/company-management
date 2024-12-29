
import AdminNavbar from "../../admin/navbar/AdminNavbar"
import { Outlet } from "react-router-dom";
import Sidebar from "../../admin/sidebar/Sidebar";

const AdminLayout = () => {
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