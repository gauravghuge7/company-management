import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const [admin, setAdmin] = useState('');
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const response = await axios.post('/api/admin/logout');
      console.log("response => ", response);
      if (response.data.success === true) {
        navigate('/');
      }
    } catch (error) {
      console.log("error => ", error);
    }
  };

  const fetchAdmin = async () => {
    try {
      const response = await axios.get('/api/admin/getAdmin');
      console.log("response => ", response);
      if (response.data.success === true) {
        setAdmin(response.data.data);
      }
    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <Navbar bg="light" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="mr-aut\" style={{ marginLeft:-80, padding: 0 }}>
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
              {admin?.adminName}
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

export default AdminNavbar;
