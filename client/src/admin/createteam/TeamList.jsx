import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, InputGroup, FormControl, Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { message } from "react-message-popup";
import axios from "axios";

const TeamList = ({ setValue }) => {
    const [teams, setTeams] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const teamsPerPage = 10;

    const dispatch = useDispatch();

    const fetchTeams = async () => {
        try {
            const response = await axios.get('/api/admin/getAllTeams');
            if (response.data.success) {
                setTeams(response.data.data.team);
                // message.success('Teams fetched successfully');
            }
        } catch (error) {
            message.error(error.message);  
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const filteredTeams = teams.filter((team) =>
        team.teamName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = filteredTeams.slice(indexOfFirstTeam, indexOfLastTeam);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredTeams.length / teamsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleEdit = (team) => {
        setSelectedTeam(team);
        setShowEditModal(true);
    };

    const handleEditSubmit = async () => {
        if (!selectedTeam) return;

        try {
            const response = await axios.put(`/api/admin/updateTeam/${selectedTeam._id}`, selectedTeam);
            if (response.data.success) {
                setTeams((prevTeams) =>
                    prevTeams.map((team) =>
                        team._id === selectedTeam._id ? selectedTeam : team
                    )
                );
                message.success('Team updated successfully');
                setShowEditModal(false);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleDelete = (id) => {
        // Implement delete functionality (optional)
        console.log(`Delete team with id: ${id}`);
    };

    return (
        <Container
            style={{
                background: "#f0f4f8",
                padding: "40px",
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                color: "#333",
                maxWidth: "100%",
                marginTop: "30px",
            }}>
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
                <h2 style={{ margin: 0, color: "#333", fontWeight: "bold" }}>Team List</h2>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <InputGroup style={{ maxWidth: "300px", marginRight: "10px" }}>
                        <FormControl
                            placeholder="Search Teams"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <InputGroup.Text>
                            <i className="bi bi-search"></i>
                        </InputGroup.Text>
                    </InputGroup>
                    <Button
                        style={{
                            backgroundColor: "#007BFF",
                            border: "none",
                            whiteSpace: "nowrap",
                            borderRadius: "8px",
                            color: "#fff",
                            fontWeight: "bold",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
                        onClick={() => setValue("createteam")}
                    >
                        Create New Team
                    </Button>
                </div>
            </div>

            <Row className="justify-content-md-center">
                <Col md={12}>
                    {currentTeams.length > 0 ? (
                        <>
                            <Table
                                striped
                                bordered
                                hover
                                responsive
                                style={{
                                    backgroundColor: "#fff",
                                    color: "#333",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                }}
                            >
                                <thead
                                    style={{
                                        backgroundColor: "#007BFF",
                                        color: "#fff",
                                    }}
                                >
                                    <tr>
                                        <th>#</th>
                                        <th>Team Name</th>
                                        <th>Team Lead</th>
                                        <th>Team Members</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTeams.map((team, index) => (
                                        <tr key={index}>
                                            <td>{indexOfFirstTeam + index + 1}</td>
                                            <td>{team.teamName}</td>
                                            <td>{team.teamLead}</td>
                                            <td>
                                                {team.employee.map((member, idx) => (
                                                    <p key={idx}>{member}</p>
                                                ))}
                                            </td>
                                            <td>
                                                <div className='d-flex'>
                                                    <Button
                                                        variant=""
                                                        style={{ color: "#007BFF" }}
                                                        className="me-2"
                                                        onClick={() => handleEdit(team)}
                                                    >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Button>
                                                    <Button
                                                        variant=""
                                                        onClick={() => handleDelete(team._id)}
                                                        style={{ color: "red" }}
                                                    >
                                                        <i className="bi bi-trash-fill"></i>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-between mt-3">
                                <Button
                                    variant="primary"
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                >
                                    <i className="bi bi-arrow-left"></i>
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={nextPage}
                                    disabled={currentPage === Math.ceil(filteredTeams.length / teamsPerPage)}
                                >
                                    <i className="bi bi-arrow-right"></i>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p style={{ color: "#333" }}>No teams registered yet.</p>
                    )}
                </Col>
            </Row>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTeam && (
                        <Form>
                            <Form.Group controlId="formTeamName">
                                <Form.Label>Team Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter team name"
                                    value={selectedTeam.teamName}
                                    onChange={(e) => setSelectedTeam({ ...selectedTeam, teamName: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formTeamLead">
                                <Form.Label>Team Lead</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter team lead"
                                    value={selectedTeam.teamLead}
                                    onChange={(e) => setSelectedTeam({ ...selectedTeam, teamLead: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="formTeamMembers">
                                <Form.Label>Team Members</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter team members (comma separated)"
                                    value={selectedTeam.employee.join(", ")}
                                    onChange={(e) => setSelectedTeam({ ...selectedTeam, employee: e.target.value.split(",") })}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default TeamList;