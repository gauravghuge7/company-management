import React, { useState, useRef } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import JoditEditor from 'jodit-react';

const AssignTaskForm = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const [projectName, setProjectName] = useState('');
    const [task, setTask] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [teamLead, setTeamLead] = useState('');

    const config = {
        readonly: false,
        placeholder: 'Start typing your description...',
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newTask = {
            projectName,
            task,
            companyName,
            teamLead,
            description: content,
        };
        console.log(newTask);

        // Clear the form fields
        setProjectName('');
        setTask('');
        setCompanyName('');
        setTeamLead('');
        setContent('');
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card className="p-4 border-0" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Card.Body>
                            <h3 className="text-center mb-4" style={{ fontWeight: '600' }}>Assign Task to Team Lead</h3>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="projectName" className="mb-3">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter project name"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="task" className="mb-3">
                                    <Form.Label>Task</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter task"
                                        value={task}
                                        onChange={(e) => setTask(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="companyName" className="mb-3">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter company name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="teamLead" className="mb-3">
                                    <Form.Label>Team Lead</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter team lead name"
                                        value={teamLead}
                                        onChange={(e) => setTeamLead(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="description" className="mb-4">
                                    <Form.Label>Description</Form.Label>
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        config={config}
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{
                                        background: 'linear-gradient(90deg, #28a745, #5bc85c)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        padding: '10px 20px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    }}
                                    className="w-100"
                                >
                                    Assign Task
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AssignTaskForm;
