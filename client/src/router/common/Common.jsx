
import {Route, Routes } from 'react-router-dom'
import Home from '../../views/home/Home'
import EmpLogin from '../../employee/login/EmpLogin'
import Login from '../../company/login/Login'
import AdminLogin from '../../admin/login/AdminLogin'
import AdminRouter from '../admin/AdminRouter'
import CompanyRouter from '../company/CompanyRouter'
import EmployeeRouter from '../employee/EmployeeRouter'
import SupportInfo from '../../Components/SupportInfo/SupportInfo'
import Reports from '../../Components/Reports/Reports'

export default function Common() {
   return (
   

      <Routes>

            <Route path='/' element={<Home />} />

            <Route path="/employee/login" element={<EmpLogin  />} />

            <Route path="/admin/login" element={<AdminLogin   />} />
            {/* <Route path="/admin/login" element={<AdminSignup   />} /> */}

            <Route path="/client/login" element={<Login />} /> 

            <Route path="/support" element={<SupportInfo />} />
            <Route path="/reports" element={<Reports />} />

            {/* Admin Routes */}
            <Route path='/admin/*' element={ <AdminRouter />} />

            {/* Company Routes */}
            <Route path='/company/*' element={ <CompanyRouter />} />

            {/* Employee Routes */}
            <Route path='/employee/*' element={ <EmployeeRouter />} />

      
      </Routes>
         

   )
}
