
import {Route, Routes } from 'react-router-dom'
import Home from '../../views/home/Home'
import EmpLogin from '../../employee/login/EmpLogin'
import Login from '../../company/login/Login'
import AdminLogin from '../../admin/login/AdminLogin'

export default function Common() {
   return (
   

      <Routes>

         <Route path='/' element={<Home />} />

         <Route path="/employee/login" element={<EmpLogin  />} />

         <Route path="/admin/login" element={<AdminLogin   />} />

         <Route path="/client/login" element={<Login />} />



      
      </Routes>
         

   )
}
