import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Componysidebar = ({ setConditionalComponent }) => {
  return (
    <div
      className="d-flex flex-column vh-100 p-3 bg-dark text-white"
      style={{
        width: '250px',
        backgroundColor: '#212529', // Darker background for better contrast
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)', // Add subtle shadow for depth
        borderRight: '1px solid #343a40', // Border to separate sidebar from content
      }}
    >
    
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <button
            onClick={() => setConditionalComponent('CompanyDashboard')}
            className="nav-link text-white"
            style={navButtonStyle}
          >
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button
            id="project-button"
            onClick={() => setConditionalComponent('Projectlist')}
            className="nav-link text-white"
            style={navButtonStyle}
          >
            <i className="bi bi-folder me-2"></i> Projects
          </button>
        </li>
        <li className="nav-item">
          <button
            id="tasks-button"
            onClick={() => setConditionalComponent('CompanyTasks')}
            className="nav-link text-white"
            style={navButtonStyle}
          >
            <i className="bi bi-list-task me-2"></i> View Tickets
          </button>
        </li>
      </ul>
    </div>
  );
};

// Custom styles for the nav buttons
const navButtonStyle = {
  backgroundColor: '#343a40', // Darker background for buttons
  border: 'none',
  padding: '10px 15px',
  borderRadius: '8px',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  textAlign: 'left',
  marginBottom: '15px',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
};

// Hover effect for buttons
const navButtonHoverStyle = {
  backgroundColor: '#495057', // Slightly lighter on hover
};

export default Componysidebar;
