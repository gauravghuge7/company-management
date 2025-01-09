import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { message } from 'react-message-popup';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { setTeamData } from '../../Redux/SetDataToRedux/TeamData';

const CreateProjectForm = () => {
    
    const [formData, setFormData] = useState({
        projectName: '',
        companyName: '',
        spokePersonEmail: '',
        spokePersonName: '',
        spokePersonNumber: '',
        description: '',
        team: "team",
        projectId: "",
        document: "",
        file: ""
    });

    



    // Get data from the redux store
    const teams = useSelector(state => state.teamReducer.team);
    
    console.log("teams => ", teams);

    const clientId = useParams().clientId;
    const clientName = useParams().clientName;
    const fetchTeams = setTeamData();
    
    useEffect(() => {
        fetchTeams
    }, [clientId, clientName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const onImageChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            projectName: formData.projectName,
            companyName: formData.companyName,
            spokePersonEmail: formData.spokePersonEmail,
            spokePersonName: formData.spokePersonName,
            spokePersonNumber: formData.spokePersonNumber,
            description: formData.description,
            team: formData.team,
            projectId: formData.projectId,
            client: clientId,
            clientName: clientName,
            file: formData.file
        };

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        };

        try {
            const response = await axios.post("/api/admin/project", body, config);
    
            if (response.data.success) {
                message.success(response.data.message);
                navigate("/admin/company");
            }
        } 
        catch (error) {
            console.log(error);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card className="p-4 border-0" style={{ borderRadius: '20px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' }}>
                        <Card.Body>
                            <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Create New Project for <b>{clientName}</b></h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="projectId" className="mb-3">
                                    <Form.Label>Project ID</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="projectId"
                                        value={formData.projectId}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="projectName" className="mb-3">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="projectName"
                                        value={formData.projectName}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                {/* <Form.Group controlId="companyName" className="mb-3">
                                    <Form.Label>Client Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group> */}

                                <Form.Group controlId="spokePersonName" className="mb-3">
                                    <Form.Label>Spokesperson Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="spokePersonName"
                                        value={formData.spokePersonName}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="spokePersonEmail" className="mb-3">
                                    <Form.Label>Spokesperson Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="spokePersonEmail"
                                        value={formData.spokePersonEmail}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="spokePersonNumber" className="mb-3">
                                    <Form.Label>Spokesperson Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        name="spokePersonNumber"
                                        value={formData.spokePersonNumber}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="team" className="mb-3">
                                    <Form.Label>Team</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="team"
                                        value={formData.team}
                                        onChange={handleChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    >
                                        <option value="team">Select Team</option>
                                        {teams.map((team, index) => (
                                            <option key={index} value={team._id}>{team.teamName}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <section>
                                    <label>Project Description</label>
                                    <textarea
                                        cols="50"
                                        className='w-full border p-2 mb-4'
                                        placeholder="Add project description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    ></textarea>
                                </section>

                                <div>
                                    <label>Select Document</label>
                                    <br />
                                    <input
                                        type="file"
                                        onChange={onImageChange}
                                        accept='*'
                                    />
                                    <br />
                                </div>
                                <br />

                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{
                                        backgroundColor: 'primary', // Teal color
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
                                        e.target.style.backgroundColor = ''; // Darker teal on hover
                                        e.target.style.transform = 'scale(1.05)'; // Slight scale-up on hover
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = ''; // Original teal when not hovering
                                        e.target.style.transform = 'scale(1)'; // Reset scale when not hovering
                                    }}
                                >
                                    Submit Project
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateProjectForm;
