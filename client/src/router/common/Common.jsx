
import {Route, Routes } from 'react-router-dom'
import Home from '../../views/home/Home'

export default function Common() {
   return (
   

      <Routes>

         <Route path='/' element={<Home />} />

         <Route path="/employee/login" element={<EmpLogin   />} />

         <Route path="/admin/login" element={<AdminLogin   />} />

         <Route path="/client/login" element={<Login />} />



         <Route path="/company/dashboard" element={<CompanyDashboard />} />
         <Route path="/employee/dashboard" element={<Employeedashboard   />} />
      
      </Routes>
         

   )
}
