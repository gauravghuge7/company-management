import  { useEffect } from 'react';
import { useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {message} from "react-message-popup"   // this is the use of the react message popup
import axios from "axios"; 

// this is the use of axios to send the request to the server




const TeamList = ({ setValue}) => {
    const [teams, setTeams] = useState([
        {                                            //  this is the dayy data  we are use the showing the list of teams
        id: 1, 
        teamName: "Team 1",
        teamLead: "John",
        employee: [
            "John",
            "akash"
        ],

        
        },
    
    ]);
  
    const dispatch = useDispatch();
  
  
   
  
  
    const fetchClients = async() => {
        try {
    
            const response = await axios.get('/api/admin/getAllTeams');
            
            console.log("response => ", response);
    
            if(response.data.success === true) {
                setTeams(response.data.data.team);
                message.success('Team fetched successfully');
            }
        
        } 
        catch (error) {
            message.error(error.message);  
        }
    }
    
    
    
    useEffect(() => {

    fetchClients();


    //   dispatch(addTeam(teams));


    },[2]);

        

    return (
        <Container>

<div className='flex justify-between'>
                <h2 className="mb-4 text-center">Teams List</h2>
                <button   className="btn btn-primary btn-lg px-4 py-2"
                    onClick={() => setValue("createteam")}
                >Add New Team</button>
            </div> 

            <Row className="justify-content-md-center mt-5">
                <Col md={12}>
                   
                    {teams.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
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
                                            {
                                                team?.employee?.map((data, index) => {
                                                    return <p key={index}>
                                                    {
                                                            data
                                                    }
                                                    </p>
                                                })
                                            }
                                        </td> 
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>No teams registered yet.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default TeamList;