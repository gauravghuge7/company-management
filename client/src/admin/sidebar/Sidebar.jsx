import { Link } from 'react-router-dom';
import './Sidebar.css'; // You can customize styles here
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar({ setValue }) {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-light" style={{ width: '250px', height: 'auto', minHeight: '100vh' }}>
   
      <hr className="bg-light" />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <button 
            className="nav-link btn btn-dark text-light" 
            aria-current="page"
            onClick={() => setValue("dashboard")}
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </button>
        </li>
        <li>
          <button 
            className="nav-link btn btn-dark text-light"
            onClick={() => setValue("employee")}  
          >
            <i className="bi bi-person-lines-fill me-2"></i>
            Employee
          </button>
        </li>
        <li>
          <button 
            className="nav-link btn btn-dark text-light"
            onClick={() => setValue("team")}  
          >
            <i className="bi bi-person-lines-fill me-2"></i>
            Team
          </button>
        </li>
        <li>
          <button 
            className="nav-link btn btn-dark text-light"
            onClick={() => setValue("compony")}  
          >
            <i className="bi bi-person-lines-fill me-2"></i>
            Client
          </button>
        </li>
        <li>
          <button 
            className="nav-link btn btn-dark text-light"
            onClick={() => setValue("project")}  
          >
            <i className="bi bi-person-lines-fill me-2"></i>
            Project
          </button>
        </li>
        <li>
          <button 
            className="nav-link btn btn-dark text-light"
            onClick={() => setValue("task")}  
          >
            <i className="bi bi-person-lines-fill me-2"></i>
            Assign task
          </button>
        </li>
        <hr className="bg-light" />
      </ul>
      <hr className="bg-light" />
    </div>
  );
}

export default Sidebar;
