import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { message } from 'react-message-popup';
import axios from "axios";
import { extractErrorMessage } from "../../Components/CustomError";
import { ToastContainer, toast } from 'react-toastify';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = {
        adminEmail: email,
        adminPassword: password,
      };

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };

      const response = await axios.post("/api/admin/login", body, config);
      console.log("response => ", response);

      if (response.data.success === true) {
        navigate("/admin/dashboard");
      }
    } 
    catch (error) {
      console.log(error);
      const err = extractErrorMessage(error.response.data);
      
      toast.error(err);
      setError(err);
    }
  };

  // Function to fill in test credentials
  const useTestCredentials = () => {
    setEmail("gaurav@admin.com");
    setPassword("gaurav");
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage: 'url("../../../public/accets/login bg.jpg")',
        backgroundSize: "cover", // Cover the entire container
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Do not repeat the image
      }}
    >
      <ToastContainer />

      

      <Row
        className="shadow-lg"
        style={{
          maxWidth: "900px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent white background
          borderRadius: "15px",
        }}
      >
        {/* Left side image */}
        <Col
          md={6}
          className="p-0 d-none d-md-block"
          style={{ borderRadius: "15px 0 0 15px" }}
        >
          <Image
            src="../../../public/accets/GBIS.png"
            alt="Login Image"
            fluid
            style={{
              height: "70%",
              width: "70%",
              margin: "50px 50px 50px 50px",
              borderRadius: "15px 0 0 15px",
            }}
          />
        </Col>

        {/* Right side login form */}
        <Col
          md={6}
          className="d-flex flex-column justify-content-center p-5"
          style={{ borderRadius: "0 15px 15px 0" }}
        >
          <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>
            Admin Login
          </h2>
          <Form onSubmit={handleSubmit}>

            <div>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                }}
              />
            </Form.Group>
            

            <Form.Group controlId="formBasicPassword" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                }}
              />
            </Form.Group>

            <Button
              variant="secondary"
              className="w-100 mb-3"
              onClick={useTestCredentials}
              style={{
                borderRadius: "10px",
                padding: "10px",
                fontWeight: "bold",
              }}
            >
              Use Test Credentials
            </Button>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{
                borderRadius: "10px",
                padding: "10px",
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLogin;