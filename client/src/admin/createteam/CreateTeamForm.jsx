import  { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import {message} from "react-message-popup"
import { useSelector } from 'react-redux';

const CreateTeamForm = () => {


    const [teamName, setTeamName] = useState('');
    const [teamLead, setTeamLead] = useState('');
    const [teamId, setTeamId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [teamMembers, setTeamMembers] = useState(['']);
    const [selectedEmployees, setSelectedEmployees] = useState([]);  // this state are mandatory for the checkboxes


    /// get data from the central store
    const emp = useSelector((state) => state.employeeReducer.employee);

    const [employees, setEmployees] = useState([]);

    /// set the employees in above state 
    const setEmployee = () => {

       let data = [];


        emp.forEach((employee) => {
            data.push(employee.employeeName);
        })


        console.log("data => ", data);

        setEmployees(data);

        


    }

    /// on mounting the component, set the employees
    useEffect(() => {

        setEmployee();

    },[])



    // handle the member changes 
    const handleMemberChange = (e)  => {

        if(e.target.checked) {
            selectedEmployees.push(e.target.value);
        }
        else {
            selectedEmployees.pop(e.target.value);  
        }

        console.log("selectedEmployees => ", selectedEmployees);
    }

    // handle the all form submit
    const handleSubmit = async(event) => {
        event.preventDefault();

        setTeamMembers(selectedEmployees);

        console.log("selectedEmployees => ", selectedEmployees);
        
        try {
        
            const body = {    // teamName, teamLead, projectId, employee, teamId
                teamName,  // teamName
                teamLead,  // teamLead
                projectId, // projectId
                employee: teamMembers.filter(member => member.trim() !== ''),
                teamId
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }

            const response = await axios.post("/api/admin/createTeams", body, config);
            console.log(response);

            if(response.data.success) {
                message.success('Team created successfully');
                
            }
            
        } 
        catch (error) {
            message.error(error.message);
        }

    };

    /// handle the team lead changes
    const handleTeamLeadChange = (e) => {
        const teamLead = e.target.value;
        setTeamLead(teamLead);
    };


    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Card className="p-4 border-0" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <Card.Body>
                            <h3 className="text-center mb-4" style={{ fontWeight: '600' }}>Create Team</h3>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="teamName" className="mb-3">
                                    <Form.Label>Team Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter team name"
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="priority" className="mb-3">

                                    <Form.Label>Select Team Lead</Form.Label>

                                    <Form.Control
                                        as="select"
                                        name="priority"
                                        value={teamLead}
                                        onChange={handleTeamLeadChange}
                                        required
                                        style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                    >
                                        <option value="">Select Team Lead</option>

                                        {
                                            employees.map((employee, index) => (
                                                <option key={index} value={employee}>{employee}</option>
                                            ))
                                        }
                                        
                                    </Form.Control>
                                </Form.Group>


                                <Form.Group controlId="teamLead" className="mb-3">
                                    <Form.Label>Team Id</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter team lead Id"
                                        value={teamId}
                                        onChange={(e) => setTeamId(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>

                                <Form.Group controlId="teamLead" className="mb-3">
                                    <Form.Label>Project Id</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Project Id"
                                        value={projectId}
                                        onChange={(e) => setProjectId(e.target.value)}
                                        required
                                        style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </Form.Group>
                                <Form.Group
    controlId="numberOfMembers"
    className="mb-3"
    style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
>
    <Form.Label id="members">Select Employees for Team</Form.Label>
    <br/>
    <div style={{ maxHeight: '200px', overflowY: 'auto', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        {
            employees.map((employee, index) => (
                <div key={index}>
                    <input 
                        type="checkbox" 
                        className='mr-2'
                        value={employee}
                        name='employee'
                        onChange={handleMemberChange}
                        style={{ borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                    />
                    <label id='employee'>{employee}</label>
                </div>
            ))
        }
    </div>
</Form.Group>




                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={{
                                        background: '#007BFF',
                                        border: 'none',
                                        borderRadius: '10px',
                                        padding: '10px 20px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    }}
                                    className="w-100"
                                >
                                    Create Team
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateTeamForm;
