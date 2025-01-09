import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { message } from 'react-message-popup';

const Employeenavbar = () => {
  
  const [employee, setemployee] = useState('');

  const navigate = useNavigate();

   
  const getEmployeeDetails = async() => {
    try {
      const response = await axios.get('/api/employee/getEmployeeDetails');
      console.log("response => ", response);

      if(response.data.success === true) {
        message.success(response.data.message);

        setemployee(response.data.data);
      }

    } 
    catch (error) {
      message.error(error.message);  
    }
  }
    
  useEffect(() => {
    getEmployeeDetails();
  },[]) 

  const onLogout = async () => {  
    try {
      const response = await axios.post('/api/employee/logout');  // this is the api call we are using the axios
      console.log("response => ", response);  // this is the api call we are using the axios
      if(response.data.success === true) {
        navigate('/employee/login');
      }

    } 
    catch (error) {
      console.log("error => ", error);
    } 
  }

  return (
    <Navbar bg="light" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" style={{ marginLeft:-80, padding: 0 }}>
          {/* Replace with your logo */}
          <img
            src="../../../accets/GBIS.png"
            width="190"
            className="d-inline-block align-top"
            alt="Logo"
            style={{ margin: 0, padding: 0 }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item className="d-flex align-items-center text-2xl mr-4 text-black">
              {employee?.employeeName}
             
            </Nav.Item>
            <Nav.Item>
              <Button variant="outline-danger" onClick={onLogout} className="ml-3">
                Logout
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Employeenavbar;
