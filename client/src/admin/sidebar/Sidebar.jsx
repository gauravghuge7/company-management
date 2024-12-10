import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { message } from 'react-message-popup';
import axios from 'axios';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'; 
import { AiOutlineDashboard, AiOutlineProject } from 'react-icons/ai'; // Dashboard and Project 
import { FiList } from 'react-icons/fi'; // Tickets icon
import { MdOutlineSupervisorAccount } from 'react-icons/md'; // Team Lead icon
import { RiTeamLine } from 'react-icons/ri'; // Team icon
import { FaUserFriends, FaRegBuilding } from 'react-icons/fa'; // Employee and Client icons

const Sidebar = ({ setValue, setConditionalComponent }) => {
  const [teams, setTeams] = useState([{ teamLead: "" }]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const checkTeamLeadOrNot = async () => {
    try {
      const response = await axios.get(`/api/employee/isTeamLead`);
      if (response.data.success === true) {
        setTeams(response.data.data);
      }
    } catch (error) {
      console.log(error);
   
    }
  };

  useEffect(() => {
    checkTeamLeadOrNot();
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`d-flex flex-column p-3  text-light`}
      style={{
        width: isCollapsed ? '80px' : '250px', 
        height: 'auto',
        minHeight: '100vh',
        buttonShadow: '2px 0 5px rgba(0, 0, 0, 0.5)', // Add subtle shadow for depth
        background: '#fff',
        boxShadow: '2px 0px 15px rgba(0, 0, 0, 0.3)',
        transition: 'width 0.3s ease',
      }}>
      {/* Arrow Button */}
      <div
        onClick={toggleSidebar}
        style={{ cursor: 'pointer', alignSelf: 'center', color: "#007BFF" }}
      >
        {isCollapsed ? (
          <BiChevronRight size={30} color= "#007BFF" />
        ) : (
          <BiChevronLeft size={30} color= "#007BFF" />
        )}
      </div>

      {/* Sidebar Header */}
      {/* {!isCollapsed && (
        <h4 className="text-center mb-4" style={{ color: '#fff' }}>
          Admin Panel
        </h4>
      )} */}

      <hr className={`bg-light ${isCollapsed ? 'd-none' : ''}`} />

      <Nav className="flex-column">
        <SidebarButton 
          onClick={() => setValue("dashboard")} 
          isCollapsed={isCollapsed} 
          icon={<AiOutlineDashboard size={20} />} 
          text="Dashboard" 
        />
        
        {/* Additional Buttons with Icons */}
        <SidebarButton 
          onClick={() => setValue("employee")} 
          isCollapsed={isCollapsed} 
          icon={<FaUserFriends size={20} />} 
          text="Employee" 
        />

        <SidebarButton 
          onClick={() => setValue("team")}  
          isCollapsed={isCollapsed} 
          icon={<RiTeamLine size={20} />} 
          text="Team" 
        />

        <SidebarButton 
          onClick={() => setValue("compony")}  
          isCollapsed={isCollapsed} 
          icon={<FaRegBuilding size={20} />} 
          text="Client" 
        />

        <SidebarButton 
          onClick={() => setValue("project")}  
          isCollapsed={isCollapsed} 
          icon={<AiOutlineProject size={20} />} 
          text="Project" 
        />

        {/* <SidebarButton 
          onClick={() => setValue("task")}  
          isCollapsed={isCollapsed} 
          icon={<FiList size={20} />} 
          text="Assign Ticket" 
        /> */}
      </Nav>
    </div>
  );
};

const SidebarButton = ({ onClick, isCollapsed, icon, text }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-dark mb-2 d-flex align-items-center"
      style={buttonStyle}
    >
      {icon}
      <span
        style={{
          marginLeft: '10px',
          opacity: isCollapsed ? '0' : '1',
          transition: 'opacity 0.3s ease',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          width: isCollapsed ? '0' : 'auto',
        }}
      >
        {text}
      </span>
    </button>
  );
};

const buttonStyle = {
  borderRadius: '5px',
  backgroundColor: '#fff',
  border: '1px solid #007BFF',
  color: '#007BFF',
  paddingLeft: '10px',
  fontSize: '18px',
  width: '100%',
  height: '40px',
  textAlign: 'left',
  boxShadow: '0 4px 8px #000', 
};

export default Sidebar;
