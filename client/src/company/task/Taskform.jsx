import { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const TaskForm = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const [formData, setFormData] = useState({
        companyName: '',
        priority: '',
        taskDetail: '',
        ticketCreateDate: '',
        dueDate: '',
        assignName: '',
    });

    const config = {
        readonly: false,
        placeholder: 'Start typing your task details...',
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleJoditChange = (newContent) => {
        setContent(newContent);
        setFormData({
            ...formData,
            taskDetail: newContent,
        });
    };

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
                                <Form.Group controlId="companyName" className="mb-3">
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="companyName"
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
                                        <option value="High">SAP ABAP</option>
                                        <option value="Medium">SAP MM</option>
                                        <option value="Low">SAP </option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="ticketCreateDate" className="mb-3">
                                    <Form.Label>Ticket Creation Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="ticketCreateDate"
                                        value={formData.ticketCreateDate}
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
                                    <Form.Label>Assign Name</Form.Label>
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

                                <Form.Group controlId="taskDetail" className="mb-4">
                                    <Form.Label>Task Details</Form.Label>
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        config={config}
                                        tabIndex={1}
                                        onBlur={handleJoditChange}
                                        onChange={() => {}}
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

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
