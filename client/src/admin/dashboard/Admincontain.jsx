import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaUserPlus, FaUsers, FaBuilding, FaProjectDiagram } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Admincontain = () => {
  const employee = useSelector((state) => state.employeeReducer?.employee);
  const teams = useSelector((state) => state.teamReducer?.team);
  const client = useSelector((state) => state.clientReducer?.client.clientList);

  const cardStyle = {
    borderRadius: '10px',
    boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.3), 8px 8px 25px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '400px',
  };

  const hoverStyle = {
    boxShadow: '6px 6px 30px rgba(0, 0, 0, 0.5), 12px 12px 40px rgba(0, 0, 0, 0.3)',
  };

  const headerStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const textStyle = {
    fontSize: '1rem',
  };

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={4} className="mb-4">
          <Card
            style={cardStyle}
            className="text-white bg-primary"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
            }}
          >
            <div className="card-header d-flex justify-content-center" style={headerStyle}>Employees</div>
            <Card.Body>
              <div className="d-flex justify-content-center mb-4">
                <FaUserPlus size={50} className="text-white mb-3" />
              </div>
              <div  className='d-flex justify-content-center '>  <h5 className="card-title" style={titleStyle}>{employee.length}</h5></div>
              <div className='d-flex justify-content-center'>
           
             <div><p className="card-text" style={textStyle}>Total number of employees.</p></div> </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card
            style={cardStyle}
            className="text-white bg-success"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
            }}
          >
            <div className="card-header d-flex justify-content-center" style={headerStyle}>Teams</div>
            <Card.Body>
              <div className="d-flex justify-content-center mb-4">
                <FaUsers size={50} className="text-white mb-3" />
              </div>
              <h5 className="card-title d-flex justify-content-center" style={titleStyle}>{teams.length}</h5>
              <p className="card-text d-flex justify-content-center" style={textStyle}>Total number of teams.</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card
            style={cardStyle}
            className="text-white bg-warning"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
            }}
          >
            <div className="card-header  d-flex justify-content-center" style={headerStyle}>Clients</div>
            <Card.Body>
              <div className="d-flex justify-content-center mb-4">
                <FaBuilding size={50} className="text-white mb-3" />
              </div>
              <h5 className="card-title d-flex justify-content-center" style={titleStyle}>{client?.length}</h5>
              <p className="card-text d-flex justify-content-center" style={textStyle}>Total number of clients.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-4">
          <Card
            style={cardStyle}
            className="text-white bg-info"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = cardStyle.boxShadow;
            }}
          >
            <div className="card-header d-flex justify-content-center" style={headerStyle}>Projects</div>
            <Card.Body>
              <div className="d-flex justify-content-center mb-4">
                <FaProjectDiagram size={50} className="text-white mb-3" />
              </div>
              <h5 className="card-title d-flex justify-content-center" style={titleStyle}>10</h5>
              <p className="card-text d-flex justify-content-center" style={textStyle}>Total number of projects.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admincontain;
