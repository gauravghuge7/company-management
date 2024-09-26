import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { message } from 'react-message-popup';
import axios from 'axios';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'; 
import { AiOutlineDashboard, AiOutlineProject } from 'react-icons/ai'; // Dashboard and Project 
import { FiList } from 'react-icons/fi'; // Tickets icon
import { MdOutlineSupervisorAccount } from 'react-icons/md'; // Team Lead icon

const EmployeeSidebar = ({ setConditionalComponent }) => {
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
      message.error("You are not a Team Lead");
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
      className={`d-flex flex-column p-3 bg-dark text-light`}
      style={{
        width: isCollapsed ? '80px' : '250px', 
        height: 'auto',
        minHeight: '100vh',
        background: '#000000',
        boxShadow: '2px 0px 15px rgba(0, 0, 0, 0.3)',
        transition: 'width 0.3s ease',
      }}
    >
      {/* Arrow Button */}
      <div
        onClick={toggleSidebar}
        style={{ cursor: 'pointer', alignSelf: 'center' }}
      >
        {isCollapsed ? (
          <BiChevronRight size={30} color="white" />
        ) : (
          <BiChevronLeft size={30} color="white" />
        )}
      </div>

      {/* Sidebar Header */}
      {/* {!isCollapsed && (
        <h4 className="text-center mb-4" style={{ color: '#fff' }}>
          Employee Panel
        </h4>
      )} */}

      <hr className={`bg-light ${isCollapsed ? 'd-none' : ''}`} />

      <Nav className="flex-column">
        <SidebarButton 
          onClick={() => setConditionalComponent("Contain")} 
          isCollapsed={isCollapsed} 
          icon={<AiOutlineDashboard size={20} />} 
          text="Dashboard" 
        />

        <SidebarButton 
          onClick={() => setConditionalComponent("projects")} 
          isCollapsed={isCollapsed} 
          icon={<AiOutlineProject size={20} />} 
          text="Project Section" 
        />

        <SidebarButton 
          onClick={() => setConditionalComponent("TaskList")} 
          isCollapsed={isCollapsed} 
          icon={<FiList size={20} />} 
          text="Tickets" 
        />

        {teams?.length > 0 && (
          <SidebarButton 
            onClick={() => setConditionalComponent("teamLead")} 
            isCollapsed={isCollapsed} 
            icon={<MdOutlineSupervisorAccount size={20} />} 
            text="Team Lead Section" 
          />
        )}
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
  backgroundColor: '#1C75BB',
  border: 'none',
  color: '#ffffff',
  paddingleft: '10px',
 
  fontSize: '16px',
  width: '100%',
  textAlign: 'left',
};

export default EmployeeSidebar;
