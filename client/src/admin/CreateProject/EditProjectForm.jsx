import React, { useRef, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';  // Import axios for making API calls


const EditProjectForm = ({ projectData, onSave }) => {


    // State to store teams fetched from API
    const [teams, setTeams] = useState([]);

    // Fetch teams from API when component mounts
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('/api/admin/getAllTeams');  // Adjust the endpoint URL
                if (response.data.success) {
                    setTeams(response.data.data.team); // Store teams in state
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

        fetchTeams();
    }, []);


    const handleChange = (e) => {
        projectData[e.target.name] = e.target.value;
    }

    const onImageChange = (e) => {
        projectData = { ...projectData, file: e.target.files[0] };
    };
    
    // Handle form submission
    const handleSubmit =async () => {

        try {
            const response = await axios.put(`/api/admin/editProject/${projectData._id}`, projectData);
            if (response.status === 200) {
                message.success('Project updated successfully');
                onSave();
            } 
            else {
                message.error('Failed to update project');
            }
        } 
        catch (error) {
            console.error('Error updating project:', error);
            message.error('Failed to update project');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card className="p-4 border-0" style={{ borderRadius: '20px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' }}>
                        <Card.Body>
                            <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Create New Task</h2>
                            <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="projectId" className="mb-3">
                                    <Form.Label>Project ID</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="projectId"
                                        value={projectData.projectId}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="projectName" className="mb-3">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="projectName"
                                        value={projectData.projectName}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                {/* <Form.Group controlId="companyName" className="mb-3">
                                    <Form.Label>Client Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="companyName"
                                        value={projectData.companyName}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group> */}

                                <Form.Group controlId="spokePersonName" className="mb-3">
                                    <Form.Label>Spokesperson Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="spokePersonName"
                                        value={projectData.spokePersonName}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="spokePersonEmail" className="mb-3">
                                    <Form.Label>Spokesperson Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="spokePersonEmail"
                                        value={projectData.spokePersonEmail}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="spokePersonNumber" className="mb-3">
                                    <Form.Label>Spokesperson Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="spokePersonNumber"
                                        value={projectData.spokePersonNumber}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="team" className="mb-3">
                                    <Form.Label>Team</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="team"
                                        value={projectData.team}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    >
                                        <option value="team">Select Team</option>
                                        {teams.map((team, index) => (
                                            <option key={index} value={team._id}>{team.teamName}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <section>
                                    <label>Project Description</label>
                                    <textarea
                                        cols="50"
                                        className='w-full border p-2 mb-4'
                                        placeholder="Add project description"
                                        value={projectData.description}
                                        onChange={(e) => setFormData({ ...projectData, description: e.target.value })}
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    ></textarea>
                                </section>

                                <div>
                                    <label>Select Document</label>
                                    <br />
                                    <input
                                        type="file"
                                        onChange={onImageChange}
                                        accept='*'
                                    />
                                    <br />
                                </div>
                                <br />

                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{
                                        backgroundColor: 'primary', // Teal color
                                        border: 'none',
                                        borderRadius: '12px',
                                        padding: '12px 24px',
                                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        transition: 'background-color 0.3s ease, transform 0.2s ease',
                                    }}
                                    className="w-100"
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = ''; // Darker teal on hover
                                        e.target.style.transform = 'scale(1.05)'; // Slight scale-up on hover
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = ''; // Original teal when not hovering
                                        e.target.style.transform = 'scale(1)'; // Reset scale when not hovering
                                    }}
                                >
                                    Submit Project
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EditProjectForm;