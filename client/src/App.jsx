

// import Employeedashboard from './employee/dashboard/Employeedashboard.jsx'
import './App.css'
// import Dashboard from '  ./company/dashboard/Dashboardcontain.jsx'
// import CompanyDashboard from './company/CompanyDashboard/CompanyDashboard.jsx'
import AdminRouter from './router/admin/AdminRouter.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Common from './router/common/Common.jsx';
import CompanyRouter from './router/company/CompanyRouter.jsx';
import EmployeeRouter from './router/employee/EmployeeRouter.jsx';


function App() {


  


  return (
    <>

      <Routes>

        <Route path='/' element={ <Common />} />


        {/* Admin Routes */}
        <Route path='/admin' element={ <AdminRouter />} />

        {/* Company Routes */}
        <Route path='/company' element={ <CompanyRouter />} />

        {/* Employee Routes */}
        <Route path='/employee' element={ <EmployeeRouter />} />
        

      </Routes>
    
    
      

    </>


  )
}

export default App

