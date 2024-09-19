
import { Navbar, Button, Container,  Nav } from "react-bootstrap";
// import { FaUser } from 'react-icons/fa'; // Import the profile icon
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Componynavabar() {

  const [client, setClient] = useState('');

  const navigate = useNavigate();

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
  };

  const fetchClient = async () => {
    try {
      const response = await axios.get("/api/client/getClient");  // this is the API call to get the client data

      console.log(response.data);

      if(response.data.success){
        setClient(response.data.data);
      }
    }

    catch (error) {
      console.log(error);
      
    }
  } ;
 useEffect(() => {
    fetchClient();
  }, []);




  // const getClient = async () => {

  //   try {
  //     const response = await axios.get("/api/client/getClient");


  //     console.log(response.data);
      
  //   } 
  //   catch (error) {
  //     console.log(error);
  //   }

  // };

 

  
  

    








  



  return (
    <div className="d-flex">
      <Navbar bg="light" expand="lg" className="flex flex-row w-full h-20">
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
              {client.clientName}
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
};

export default Componynavabar;
