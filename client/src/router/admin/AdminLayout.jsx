

import { Outlet } from "react-router-dom";


const AdminLayout = () => {
   return (
      <>
         <AdminNavbar />

      
         <div className="d-flex">
            
            <Sidebar setValue={setValue} />

            <div className="flex-grow-1 p-3">

               <Outlet />   
         
            </div>
   
         </div>
      
      
         <Adminfooter />
      
      
      </>
   )
}  

export default AdminLayout