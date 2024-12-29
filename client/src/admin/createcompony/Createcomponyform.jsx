import  { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from "axios";
import {message } from "react-message-popup";
import { extractErrorMessage } from '../../Components/CustomError';

const CreateCompanyForm = () => {
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyPassword, setCompanyPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        if (companyPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        try {
            
            const body = {
                clientName: companyName,
                clientEmail: companyEmail,
                clientPassword: companyPassword,
            }
    
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
    
            const response = await axios.post('/api/client/register', body, config);
    
            console.log(response);

            if(response?.data?.success) {
                message.success(response?.data?.message);
                window.location.href = "/admin/company";
            }
            
        } 
        catch (error) {
            const err = extractErrorMessage(error?.response?.data);
            message.error(err);
        
        }
        
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card className="p-4 border-0" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Card.Body>
                            <h3 className="text-center mb-4" style={{ fontWeight: '600' }}>Create Client</h3>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="companyName" className="mb-3">
                                    <Form.Label>Client Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter company name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="companyEmail" className="mb-3">
                                    <Form.Label>Client Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter company email"
                                        value={companyEmail}
                                        onChange={(e) => setCompanyEmail(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="companyPassword" className="mb-3">
                                    <Form.Label>Client Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={companyPassword}
                                        onChange={(e) => setCompanyPassword(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="confirmPassword" className="mb-4">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
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
                                    Create Client
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateCompanyForm;
