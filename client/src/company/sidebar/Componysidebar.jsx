import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'; 
import { AiOutlineDashboard } from 'react-icons/ai'; // Dashboard icon
import { FaRegBuilding } from 'react-icons/fa'; // Projects icon
import { FiList } from 'react-icons/fi'; // Tickets icon

const Componysidebar = ({ setConditionalComponent }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`d-flex flex-column p-3 bg-dark text-white`}
      style={{
        width: isCollapsed ? '80px' : '250px', 
        backgroundColor: '#212529', // Darker background for better contrast
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)', // Add subtle shadow for depth
        borderRight: '1px solid #343a40', // Border to separate sidebar from content
        height: 'auto',
        minHeight: '100vh',
        transition: 'width 0.3s ease',
      }}
    >
      {/* Arrow Button */}
      <div
        onClick={toggleSidebar}
        style={{ cursor: 'pointer', alignSelf: 'center', marginBottom: '10px' }}
      >
        {isCollapsed ? (
          <BiChevronRight size={20} color="white" />
        ) : (
          <BiChevronLeft size={20} color="white" />
        )}
      </div>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <button
            onClick={() => setConditionalComponent('CompanyDashboard')}
            className="nav-link text-white"
            style={navButtonStyle}
          >
            <AiOutlineDashboard size={20} className="me-2" />
            {!isCollapsed && 'Dashboard'} {/* Show text only when expanded */}
          </button>
        </li>
        <li className="nav-item">
          <button
            id="project-button"
            onClick={() => setConditionalComponent('Projectlist')}
            className="nav-link text-white"
            style={navButtonStyle}
          >
            <FaRegBuilding size={20} className="me-2" />
            {!isCollapsed && 'Projects'} {/* Show text only when expanded */}
          </button>
        </li>
        <li className="nav-item">
          <button
            id="tasks-button"
            onClick={() => setConditionalComponent('CompanyTasks')}
            className="nav-link text-white"
            style={navButtonStyle}
          >
            <FiList size={20} className="me-2" />
            {!isCollapsed && 'View Tickets'} {/* Show text only when expanded */}
          </button>
        </li>
      </ul>
    </div>
  );
};

// Custom styles for the nav buttons
const navButtonStyle = {
  backgroundColor: '#1C75BB', // Darker background for buttons
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
