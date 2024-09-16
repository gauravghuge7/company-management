import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { message } from "react-message-popup"; // React message popup
import axios from "axios"; // Axios to send requests to the server

const TeamList = ({ setValue }) => {
    const [teams, setTeams] = useState([{
        id: 1, 
        teamName: "Team 1",
        teamLead: "John",
        employee: [
            "John",
            "Akash"
        ],
    }]);

    const dispatch = useDispatch();

    const fetchClients = async () => {
        try {
            const response = await axios.get('/api/admin/getAllTeams');
            console.log("response => ", response);

            if (response.data.success === true) {
                setTeams(response.data.data.team);
                message.success('Teams fetched successfully');
            }
        } catch (error) {
            message.error(error.message);  
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <Container className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-center">Teams List</h2>
                <Button 
                    className="btn btn-primary btn-lg px-4 py-2"
                    onClick={() => setValue("createteam")}
                >
                    Add New Team
                </Button>
            </div> 

            <Row className="justify-content-md-center">
                <Col md={12}>
                    {teams.length > 0 ? (
                        <Table striped bordered hover responsive className="text-center">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>#</th>
                                    <th>Team Name</th>
                                    <th>Team Lead</th>
                                    <th>Team Members</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.map((team, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
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
                    ) : (
                        <p className="text-center">No teams registered yet.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default TeamList;
