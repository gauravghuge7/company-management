import { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { message } from "react-message-popup";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // Common font styles
  const fontStyle = {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "1.2rem",
    lineHeight: "1.6",
    color: "#424242",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = {
        employeeEmail: email,
        employeePassword: password,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post("/api/employee/login", body, config);

      console.log(response.data.data);

      if (response.data.success === true) {
        if (response.data.data.userType === "employee") {
          message.success("Employee Logged In Successfully");
          window.location.href = "/employee/dashboard";
        } else if (response.data.data.userType === "admin") {
          message.success("Admin Logged In Successfully");
          window.location.href = "/admin/dashboard";
        } else if (response.data.data.userType === "client") {
          message.success("Client Logged In Successfully");
          window.location.href = "/company/dashboard";
        }
      }
    } catch (error) {
      console.log(error);
      message.error("Invalid Email or Password");
    }
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    console.log("Contact Form Submitted", { contactName, contactEmail, contactMessage });
  };

  return (
    <>
      <Navbar />
      
      {/* First container with Welcome and Login */}
      <Container fluid className="p-0" style={{ backgroundColor: "#E3F2FD" }}>
        <Row style={{ minHeight: "100vh" }} noGutters>
          {/* Welcome Section */}
          <Col lg={6} md={12} className="d-flex flex-column justify-content-center p-4" style={{ backgroundColor: "#E3F2FD", color: "black" }}>
            <h1 style={{ fontWeight: "bold", fontSize: "2.5rem",  textAlign: "center",color: "#1565C0" }}>
              👋🏻 Welcome to Our Ticketing Portal!
            </h1>
            <br />
            <p style={{ ...fontStyle }}>
              We’re thrilled to have you here! Please log in with your credentials to access your account and manage your tickets effortlessly.
              <br /><br />
              Have questions or need help? Just reach out — we’re always here to assist you. Your success is our priority!
            </p>
          </Col>

          {/* Login Section */}
          <Col lg={6} md={12} className="d-flex flex-column justify-content-center p-4" style={{ backgroundColor: "#fff" }}>
            <h2 className="text-center mb-4" style={{ fontWeight: "bold", fontSize: "2.5rem" }}>Login Here</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mb-3">
                <Form.Label style={{ ...fontStyle }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ borderRadius: "10px", padding: "10px"}}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mb-4">
                <Form.Label style={{ ...fontStyle }}>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ borderRadius: "10px", padding: "10px"}}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                style={{ borderRadius: "10px", padding: "10px", fontWeight: "bold" }}
              >
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Second container with About Us and Contact Us */}
      <Container fluid className="p-0" style={{ backgroundColor: "#E3F2FD" }}>
        <Row noGutters style={{ minHeight: "100vh" }}>
          {/* Left side About Us */}
          <Col lg={6} md={12} className="d-flex flex-column justify-content-center p-4" style={{ backgroundColor: "#fff" }}>
          <h1 style={{ fontWeight: "bold", fontSize: "2.5rem",  textAlign: "center",color: "#1565C0" }}>
              About Us
            </h1>
            <br />
            <p style={{ ...fontStyle }}>
              Excellence, enthusiasm, and adaptability are all hallmarks of Global Business Infotech Solutions. We’ve been providing world-class SAP and Salesforce consulting, software development, testing, and user interface design services for over three years.  <br /> <br />Our highly skilled team ensures that every project is executed on time, within scope, and at an affordable cost, meeting diverse business needs with exceptional quality.
            </p>
          </Col>

          {/* Right side Contact Us form */}
          <Col lg={6} md={12} className="d-flex flex-column justify-content-center p-4" style={{ backgroundColor: "#E3F2FD" }}>
            <h2 className="text-center mb-4" style={{ fontWeight: "bold", fontSize: "2.5rem" }}>Contact Us</h2>
            <Form onSubmit={handleContactSubmit}>
              <Form.Group controlId="contactName" className="mb-3">
                <Form.Label style={{ ...fontStyle }}>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required
                  style={{ borderRadius: "10px", padding: "10px"}}
                />
              </Form.Group>

              <Form.Group controlId="contactEmail" className="mb-3">
                <Form.Label style={{ ...fontStyle }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  style={{ borderRadius: "10px", padding: "10px" }}
                />
              </Form.Group>

              <Form.Group controlId="contactMessage" className="mb-4">
                <Form.Label style={{ ...fontStyle }}>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your message here"
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  required
                  style={{ borderRadius: "10px", padding: "10px"}}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                style={{ borderRadius: "10px", padding: "10px", fontWeight: "bold" }}
              >
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default Home;
