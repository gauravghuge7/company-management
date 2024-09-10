
import { Link } from 'react-router-dom';
import './Sidebar.css'; // You can customize styles here
import 'bootstrap/dist/css/bootstrap.min.css';
function Sidebar({ setValue }) {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '250px', height: '100vh' }}>
      <h4 className="text-center">Admin Panel</h4>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">

          <button 
            className="nav-link " 
            aria-current="page"
            onClick={() => setValue("dashboard")}
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </button>

        </li>
        <li>
          <button 
          
            className="nav-link"
            onClick={() => setValue("employee")}  
          >
            <i className="bi bi-person-lines-fill me-2"></i>
          Employee
                  
          </button>
        </li>
        <li>
        <button 
          
          className="nav-link"
          onClick={() => setValue("team")}  
        >
          <i className="bi bi-person-lines-fill me-2"></i>
        Team
                
        </button>
        </li>
        <li>
        <button 
          
          className="nav-link"
          onClick={() => setValue("compony")}  
        >
          <i className="bi bi-person-lines-fill me-2"></i>
        Client
                
        </button>
        </li>
        <li>
        <button 
          
          className="nav-link"
          onClick={() => setValue("project")}  
        >
          <i className="bi bi-person-lines-fill me-2"></i>
        Project
                
        </button>
        </li>
        <li>
        <button 
          
          className="nav-link"
          onClick={() => setValue("task")}  
        >
          <i className="bi bi-person-lines-fill me-2"></i>
        Assign task
                
        </button>
        </li>
        <hr />
      </ul>
      <hr />
    </div>
  );
}

export default Sidebar;
