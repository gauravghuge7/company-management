import React, { useRef, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';  // Import axios for making API calls

const TaskForm = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    // State to store form data
    const [formData, setFormData] = useState({
        taskName: '',
        priority: '',
        saptype: '',
        assignteam: '',
        dueDate: '',
        assignName: '',
        assignEmail: '',
        description: ''
    });

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

    // Config for JoditEditor
    const config = {
        readonly: false,
        placeholder: 'Start typing your task details...',
    };

    // Handle input changes for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle Jodit editor changes
    const handleJoditChange = (newContent) => {
        setContent(newContent);
        setFormData({
            ...formData,
            taskDetail: newContent,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Handle form submission logic here
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card className="p-4 border-0" style={{ borderRadius: '20px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' }}>
                        <Card.Body>
                            <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Create New Task</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="taskName" className="mb-3">
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="taskName"
                                        value={formData.taskName}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="priority" className="mb-3">
                                    <Form.Label>Priority</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="saptype" className="mb-3">
                                    <Form.Label>SAP Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="saptype"
                                        value={formData.saptype}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    >
                                        <option value="">Select SAP Type</option>
                                        <option value="sapabap">SAP ABAP</option>
                                        <option value="sapmm">SAP MM</option>
                                        <option value="sappp">SAP PP</option>
                                        <option value="sapfico">SAP FICO</option>
                                        <option value="sapsd">SAP SD</option>
                                    </Form.Control>
                                </Form.Group>

                                {/* Dynamic Assign To Team Dropdown */}
                                <Form.Group controlId="assignteam" className="mb-3">
                                    <Form.Label>Assign To Team</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="assignteam"
                                        value={formData.assignteam}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    >
                                        <option value="">Select Team</option>
                                        {teams.map((team) => (
                                            <option key={team._id} value={team.teamName}>
                                                {team.teamName}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="dueDate" className="mb-3">
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="assignName" className="mb-3">
                                    <Form.Label>Assign BY From</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="assignName"
                                        value={formData.assignName}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="assignName" className="mb-3">
                                    <Form.Label>Assign By Email</Form.Label>
                                    <Form.Control
                                        type="Email"
                                        name="assignEmail"
                                        value={formData.assignEmail}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <section>
                  <label> Project Description </label>
                  <textarea 
                     cols="50" 
                     className='w-full border p-2 mb-4'
                     placeholder="Add text to the slide"
                     value={formData.description}
                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                     style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                  >
                  </textarea>
               </section>
               <div>
                  <label> Select Document </label>
                  <br/>
                  <input 
                     type="file"
                     
                     accept='*'
                  />
              

               </div>
               <br/>

              
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
                                    Submit Task
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TaskForm;