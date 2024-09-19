import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { message } from "react-message-popup";
import axios from "axios";

const TeamList = ({ setValue }) => {
    const [teams, setTeams] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const teamsPerPage = 10;

    const dispatch = useDispatch();

    const fetchTeams = async () => {
        try {
            const response = await axios.get('/api/admin/getAllTeams');
            console.log("response => ", response);

            if (response.data.success) {
                setTeams(response.data.data.team);
                message.success('Teams fetched successfully');
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
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                }}
            >
                <h2 style={{ margin: 0, color: "#333" }}>Teams List</h2>
                <InputGroup className="w-50">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Teams"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      
                        style={{ 
                            borderRadius: '8px', 
                            padding: '15px', 
                            border: '1px solid #ced4da',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            marginRight: '10px',
                            marginTop: '5px',
                          maxWidth: "100%",
                         marginRight: "10px"
                            
                        }}
                    />
                    <Button
                        style={{
                            backgroundColor: "#007BFF",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: "8px",
                            color: "#fff",
                            maxWidth: "50%",
                            fontWeight: "bold",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#007BFF")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
                        onClick={() => setValue("createteam")}
                    >
                        Add New Team
                    </Button>
                </InputGroup>
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
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-between mt-3">
                                <Button
                                    style={{
                                        backgroundColor: "#007BFF",
                                        border: "none",
                                        borderRadius: "8px",
                                        padding: "10px 20px",
                                        fontWeight: "bold",
                                        transition: "background-color 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#007BFF")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <Button
                                    style={{
                                        backgroundColor: "#007BFF",
                                        border: "none",
                                        borderRadius: "8px",
                                        padding: "10px 20px",
                                        fontWeight: "bold",
                                        transition: "background-color 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#007BFF")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
                                    onClick={nextPage}
                                    disabled={currentPage === Math.ceil(filteredTeams.length / teamsPerPage)}
                                >
                                    Next
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p style={{ color: "#333" }}>No teams registered yet.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default TeamList;