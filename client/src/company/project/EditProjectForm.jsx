import { useState } from 'react';

import axios from 'axios';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { message } from 'react-message-popup';

const TaskForm = ({ currentProject, setConditionalComponent, onSave, setIsEditing }) => {

    
    const [msg, setMsg] = useState("");

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






    const handleSubmit = async(e) => {
        
        e.preventDefault();
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            };
    
            const body = {
                
                assignedByEmail: formData.assignedByEmail, 
                assignedByName: formData.assignedByName,
                assignedTo: formData.assignteam,
    
                priority: formData.priority,
                project: currentProject._id,
    
                ticketName: formData.ticketName,
                ticketId: formData.ticketId,
                description: formData.ticketDescription,
                document: formData.document,

                saptype: formData.saptype,
                dueDate: formData.dueDate,

            }
    
            setMsg("Creating Ticket ...");

            const response = await axios.post("/api/client/createTicket", body, config);
    
            console.log("response.data => ", response.data);
    
            if(response.data.success) {
                setMsg("");
                setIsEditing(false);
                message.success("Ticket created successfully");
            }
    
        } 
        catch (error) {
            message.error(error.message);
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

            <button style={{ padding: "8px 16px",
            borderRadius: "8px",
            color: "#fff"}} onClick={() => setIsEditing(false)}
                    className="btn btn-primary btn-lg px- py-2">
                <i className='bi bi-arrow-left'></i>
            </button>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card className="p-4 border-0" style={{ borderRadius: '20px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' }}>
                        <Card.Body>
                            <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Create New Ticket</h2>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="companyName" className="mb-3">
                                    <Form.Label>Ticket Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="companyName"
                                        value={formData.ticketName}
                                        onChange={(e) => setFormData({ ...formData, ticketName: e.target.value })}
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
                                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
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
                                        onChange={(e) => setFormData({ ...formData, saptype: e.target.value })}
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
                                        onChange={(e) => setFormData({ ...formData, assignteam: e.target.value })}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>
                            

                                {/* <Form.Group controlId="dueDate" className="mb-3">
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group> */}

                                <Form.Group controlId="assignName" className="mb-3">
                                    <Form.Label>Assign BY From</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="assignName"
                                        value={formData.assignedByName}
                                        onChange={(e) => setFormData({ ...formData, assignedByName: e.target.value })}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="assignName" className="mb-3">
                                    <Form.Label>Assign By Email</Form.Label>
                                    <Form.Control
                                        type="Email"
                                        name="assignEmail"
                                        value={formData.assignedByEmail}
                                        onChange={(e) => setFormData({ ...formData, assignedByEmail: e.target.value })}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="ticketId" className="mb-3">
                                    <Form.Label>Ticket ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="ticketId"
                                        value={formData.ticketId}
                                        onChange={(e) => setFormData({ ...formData, ticketId: e.target.value })}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                            
                                

                                <section>
                                    <label> Ticket Description </label>
                                        <textarea 
                                            cols="50" 
                                            className='w-full border p-2 mb-4'
                                            placeholder="Add text to the slide"
                                            value={formData.ticketDescription}
                                            onChange={(e) => setFormData({ ...formData, ticketDescription: e.target.value })}
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

                                <section>
                                    {
                                        msg &&
                                        <div className="alert alert-success" role="alert">
                                            {msg}
                                        </div>
                                    }
                                </section>

                            <br/>

                            
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{
                                        backgroundColor: '#007BFF', // Teal color
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
                                        e.target.style.backgroundColor = '#007BFF'; // Darker teal on hover
                                        e.target.style.transform = 'scale(1.05)'; // Slight scale-up on hover
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = '#007BFF'; // Original teal when not hovering
                                        e.target.style.transform = 'scale(1)'; // Reset scale when not hovering
                                    }}
                                >
                                    Submit Ticket
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