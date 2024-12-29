

import './App.css'
import AdminRouter from './router/admin/AdminRouter.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Common from './router/common/Common.jsx';
import CompanyRouter from './router/company/CompanyRouter.jsx';
import EmployeeRouter from './router/employee/EmployeeRouter.jsx';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function App() {


  


  return (
    <>

      <ToastContainer />

      <Routes>

  

        <Route path='/*' element={ <Common />} />


      

      </Routes>
    
    
      

    </>


  )
}

export default App

