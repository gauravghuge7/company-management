
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtection = () => {
   
   const admin = localStorage.getItem('CompanyAdmin');

   if(admin !== admin || admin === null) {
      return <Navigate to="/admin/login" />
   }
   
   return (
      <div>
         <Outlet />
      </div>
   );
}

export default AdminProtection;
