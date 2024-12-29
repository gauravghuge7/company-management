import axios from 'axios';
import React, { useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaUserPlus, FaUsers, FaBuilding, FaProjectDiagram } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'react-message-popup';
import { addTeam } from '../../Redux/team.reducer';
import { setEmployeeData } from '../../Redux/SetDataToRedux/EmployeeData';
import { setClientData } from '../../Redux/SetDataToRedux/ClientData';


const AdminContain = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const fetchEmployees = setEmployeeData();
  const fetchCompanies = setClientData();

  const fetchTeams = async() => {

    try {

        const response = await axios.get('/api/admin/getAllTeams');
        
        console.log("response => ", response);
    
        if(response.data.success === true) {
    
          dispatch(addTeam(response.data.data.team));
          console.log("teams => ", response.data.data.team);
          // message.success('Team fetched ');
        }

    } 
    catch (error) {
        const err = error?.response?.data?.message;
        message.error(err);
        if(err === "unauthorized admin ") {
            window.location.href = "/admin/login";
        }
        message.error(error.message);  
    }

}


useEffect(() => {
  fetchEmployees;
  fetchTeams();
  fetchCompanies;

},[])


  const employee = useSelector((state) => state.employeeReducer?.employee);
  const teams = useSelector((state) => state.teamReducer?.team);
  const client = useSelector((state) => state.clientReducer?.client.clientList);





  const cardStyle = {
    borderRadius: '12px',
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2), 4px 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '350px',
  };

  const hoverStyle = {
    boxShadow: '4px 4px 16px rgba(0, 0, 0, 0.3), 8px 8px 24px rgba(0, 0, 0, 0.2)',
    transform: 'translateY(-10px)',
  };

  const headerStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#555',
  };

  const titleStyle = {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: '#333',
  };

  const textStyle = {
    fontSize: '0.9rem',
    color: '#777',
  };

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center">
        <Col md={3} className="mb-4">
          <Card
            style={{ ...cardStyle, backgroundColor: '#e3f2fd' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
              e.currentTarget.style.transform = hoverStyle.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => handleCardClick('/admin/employee')} // Navigate to Employees page
          >
            <div className="card-header text-center" style={headerStyle}>Employees</div>
            <Card.Body>
              <div className="d-flex justify-content-center mb-3">
                <FaUserPlus size={40} className="text-primary mb-2" />
              </div>
              <h5 className="card-title text-center" style={titleStyle}>{employee.length}</h5>
              <p className="card-text text-center" style={textStyle}>Total number of employees.</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-4">
          <Card
            style={{ ...cardStyle, backgroundColor: '#e8f5e9' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
              e.currentTarget.style.transform = hoverStyle.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => handleCardClick('/admin/team')} // Navigate to Teams page
          >
            <div className="card-header text-center" style={headerStyle}>Teams</div>
            <Card.Body>
              <div className="d-flex justify-content-center mb-3">
                <FaUsers size={40} className="text-success mb-2" />
              </div>
              <h5 className="card-title text-center" style={titleStyle}>{teams.length}</h5>
              <p className="card-text text-center" style={textStyle}>Total number of teams.</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-4">
          <Card
            style={{ ...cardStyle, backgroundColor: '#fff3e0' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
              e.currentTarget.style.transform = hoverStyle.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => handleCardClick('/admin/company')} // Navigate to Clients page
          >
            <div className="card-header text-center" style={headerStyle}>Clients</div>
            <Card.Body>
              <div className="d-flex justify-content-center mb-3">
                <FaBuilding size={40} className="text-warning mb-2" />
              </div>
              <h5 className="card-title text-center" style={titleStyle}>{client?.length}</h5>
              <p className="card-text text-center" style={textStyle}>Total number of clients.</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-4">
          <Card
            style={{ ...cardStyle, backgroundColor: '#e0f7fa' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
              e.currentTarget.style.transform = hoverStyle.transform;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => handleCardClick('/admin/project')} // Navigate to Projects page
          >
            <div className="card-header text-center" style={headerStyle}>Projects</div>
            <Card.Body>
              <div className="d-flex justify-content-center mb-3">
                <FaProjectDiagram size={40} className="text-info mb-2" />
              </div>
              <h5 className="card-title text-center" style={titleStyle}>10</h5>
              <p className="card-text text-center" style={textStyle}>Total number of projects.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminContain;
