import { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {message} from "react-message-popup"
import axios from "axios";  
import { toast, ToastContainer } from "react-toastify";
import { extractErrorMessage } from "../../Components/CustomError";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      
      const body = {
        clientEmail: email,
        clientPassword: password
      }

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }


      const response = await axios.post("/api/client/login",body, config);


      console.log(response.data);

      if(response.data.success === true){
        message.success("Client Logged In Successfully");
        navigate("/admin/companylist");
        
      }
    } 

    catch (error) {
    
      console.log(error);
      const err = extractErrorMessage(error.response.data);
      toast.error(err);
    }

  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <ToastContainer />
      <Row
        className="shadow-lg"
        style={{
          maxWidth: "900px", 
          width: "100%",
          backgroundColor: "white",
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
              margin : "50px 50px 50px 50px",  
              // objectFit: "cover",
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
            Client Login
          </h2>
          <Form onSubmit={handleSubmit}>
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

export default Login;