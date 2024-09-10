
import { Navbar, Button, Container, Dropdown, Form, Modal, Nav } from "react-bootstrap";
import { FaUser } from 'react-icons/fa'; // Import the profile icon
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Componynavabar() {

  const [client, setClient] = useState('');

  const navigate = useNavigate();



  const getClient = async () => {

    try {
      const response = await axios.get("http://localhost:8080/client/getClient");


      console.log(response.data);
      
    } 
    catch (error) {
      console.log(error);
    }

  };


  
  const onLogout = async () => {

    try {
      const response = await axios.post("/api/client/logout");
      


      console.log(response.data);




      if(response.data.success){
        navigate("/");
      }
    } 
    catch (error) {
      console.log(error);  
    }
  }

    





  useEffect(() => {
    getClient();
  }, []);




  



  return (
    <div className="d-flex">
      <Navbar bg="white" expand="lg" className="flex flex-row w-full h-20">
        <Container className="flex flex-row justify-center align-items-center">
          {/* Logo */}
          <Navbar.Brand href="#" className="mb-3">
            <img
              src="../../../public/accets/GBIS.png"
              alt="Logo"
              style={{ width: "70%", height: "auto" }}
            />
          </Navbar.Brand>

        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item className="d-flex align-items-center text-black">
              {client?.clientName}
            </Nav.Item>
            <Nav.Item>
              <Button variant="outline-dark" onClick={onLogout} className="ml-3">
                Logout
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
      </Navbar>


    </div>
  );
}

export default Componynavabar;
