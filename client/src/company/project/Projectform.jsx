import { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { message } from 'react-message-popup';
import axios from 'axios';

const ProjectForm = () => {

  const [project, setProject] = useState({
    projectId: "",
    projectName: "",
    description: "",


  })

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission

    try {
      const data = {


  
      };
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
  
        }
      };
  
      const response = await axios.post("/api/client/createProject", data, config);
  
      console.log(response.data);
    } 
    catch (error) {
      message.error(error.message);
    }
    
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card 
            className="p-4 border-0" 
            style={{ 
              borderRadius: '15px', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' 
            }}
          >
            <Card.Body>
              <h2 
                className="text-center mb-4" 
                style={{ 
                  fontWeight: 'bold', 
                  color: '#333' 
                }}
              >
                Create New Project
              </h2>
              <Form onSubmit={handleSubmit}>

                <Form.Group controlId="projectName" className="mb-3">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter project name"
                    value={project.projectName}
                    onChange={(e) => setProject.projectName(e.target.value)}
                    required
                    style={{ 
                      borderRadius: '10px', 
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="teamLead" className="mb-3">
                  <Form.Label>Team Lead</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Project Id"
                    value={project.projectId}
                    onChange={(e) => setTeamLead(e.target.value)}
                    required
                    style={{ 
                      borderRadius: '10px', 
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="startDate" className="mb-3">
                  <Form.Label>Project Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    style={{ 
                      borderRadius: '10px', 
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="description" className="mb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="Enter project description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ 
                      borderRadius: '10px', 
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
                    }}
                  />
                </Form.Group>

                <Button
  type="submit"
  className="w-100"
  style={{
    background: 'linear-gradient(90deg, #008080, #00bfae)', // Teal gradient background
    border: 'none',
    borderRadius: '10px',
    padding: '10px 20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
    fontWeight: 'bold',
    color: '#fff',
    transition: 'background 0.3s ease',
  }}
  onMouseEnter={(e) => {
    e.target.style.background = 'linear-gradient(90deg, #004d40, #009688)'; // Darker teal gradient on hover
  }}
  onMouseLeave={(e) => {
    e.target.style.background = 'linear-gradient(90deg, #008080, #00bfae)'; // Original teal gradient when not hovering
  }}
>
  Create Project
</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectForm;
