import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const TaskForm = ({ currentProject, setConditionalComponent, onSave, setIsEditing }) => {

    const editor = useRef(null);
    const [content, setContent] = useState('');

    const [formData, setFormData] = useState({

        assignedTo: "", 
        assignedByEmail: "", 
        assignedByName: "", 

    
        priority: "",
        project: "",

        ticketName: "",
        ticketId: "",
        ticketDescription: '',
        saptype: "",

        taskDetail: '',
        ticketCreateDate: '',
        dueDate: '',

        document: ""
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = {
            
            assignedByEmail: formData.assignedByName, 
            assignedByName: formData.assignedByEmail,

            projectId: formData.project,
            priority: formData.priority,
            project: currentProject._id,

            ticketId: formData.ticketId,
            ticketDescription: formData.ticketDescription,
        }






    };




    const selectFile = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            document: file,
        });
    };

    return (
        <Container className="mt-5">

            <button onClick={() => setIsEditing(false)}>
                back
            </button>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card className="p-4 border-0" style={{ borderRadius: '20px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' }}>
                        <Card.Body>
                            <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Create New Task</h2>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="companyName" className="mb-3">
                                    <Form.Label>Ticket Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="companyName"
                                        value={formData.ticketName}
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

                                <Form.Group controlId="priority" className="mb-3">
                                    <Form.Label>SAP Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="saptype"
                                        value={formData.saptype}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="sapabap">SAP ABAP</option>
                                        <option value="sapmm">SAP MM</option>
                                        <option value="sappp">SAP PP</option>
                                        <option value="sapfico">SAP FICO</option>
                                        <option value="sapsd">SAP SD</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="assignName" className="mb-3">
                                    <Form.Label>Assign To Team</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="assignName"
                                        value={formData.assignteam}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
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
                                        value={formData.assignedByName}
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
                                        onChange={selectFile}
                                        accept='*'
                                    />
                                

                                </div>
                            <br/>

                            
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{
                                        backgroundColor: '#17a2b8', // Teal color
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
                                        e.target.style.backgroundColor = '#138496'; // Darker teal on hover
                                        e.target.style.transform = 'scale(1.05)'; // Slight scale-up on hover
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#17a2b8'; // Original teal when not hovering
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
