import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Employeecontain = () => {
    return (
        <div className="container mt-5">
            <h2 className="text-center">Employee Dashboard</h2>
            <Row className="mt-4">
                {/* Tasks Completed */}
                <Col md={4}>
                    <Card className="text-center shadow-sm" style={{ border: '1px solid #17a2b8', backgroundColor: '#e3f2fd' }}>
                        <Card.Body>
                            <Card.Title style={{ color: '#17a2b8', fontWeight: 'bold' }}>Tasks Completed</Card.Title>
                            <Card.Text>
                                <h3 style={{ color: '#28a745' }}>15</h3>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Pending Tasks */}
                <Col md={4}>
                    <Card className="text-center shadow-sm" style={{ border: '1px solid #ffc107', backgroundColor: '#fff3cd' }}>
                        <Card.Body>
                            <Card.Title style={{ color: '#ffc107', fontWeight: 'bold' }}>Pending Tasks</Card.Title>
                            <Card.Text>
                                <h3 style={{ color: '#dc3545' }}>5</h3>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Team Lead */}
                <Col md={4}>
                    <Card className="text-center shadow-sm" style={{ border: '1px solid #007bff', backgroundColor: '#e9ecef' }}>
                        <Card.Body>
                            <Card.Title style={{ color: '#007bff', fontWeight: 'bold' }}>To Do Tasks</Card.Title>
                            <Card.Text>
                                <h3 style={{ color: '#007bff' }}>5</h3>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Employeecontain;
