
import { Outlet } from "react-router-dom";
import Componynavabar from "../../company/navbar/Componynavabar";
import Componysidebar from "../../company/sidebar/Componysidebar";

const CompanyLayout = () => {
   return (
      <>
         <Componynavabar />

      
         <div className="d-flex">
            
            <Componysidebar setValue={setValue} />

            <div className="flex-grow-1 p-3">

               <Outlet />   
         
            </div>
   
         </div>   
      
         <Adminfooter />
      
      
      </>
   )
}  

export default CompanyLayout