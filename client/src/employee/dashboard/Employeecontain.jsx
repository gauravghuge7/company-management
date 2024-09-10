import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Employeecontain = () => {
    return (
        <div className="container mt-5">
            <h2>Employee Dashboard</h2>
            <Row className="mt-4">
                {/* Tasks Completed */}
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Tasks Completed</Card.Title>
                            <Card.Text>
                                {/* Replace this with dynamic data */}
                                <h3>15</h3>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Pending Tasks */}
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Pending Tasks</Card.Title>
                            <Card.Text>
                                {/* Replace this with dynamic data */}
                                <h3>5</h3>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Team Lead */}
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Team Lead</Card.Title>
                            <Card.Text>
                                {/* Replace this with dynamic data */}
                                <h3>John Doe</h3>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Employeecontain;
