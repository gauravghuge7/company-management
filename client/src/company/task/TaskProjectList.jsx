import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';

const TaskProjectList = ({ setConditionalComponent, setProjectId }) => {
  const [projectData, setProjectData] = useState([]);

  const getProjects = async () => {
    try {
      const response = await axios.get('/api/client/fetchProjects');
      console.log(response.data);

      if (response.data.success) {
        setProjectData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const sendProjectId = (Id) => {
    setProjectId(Id);
    setConditionalComponent('tasklist');
  };

  return (
    <Container
      style={{
        background: "#f0f4f8",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
        color: "#333",
        maxWidth: "95%",
        marginTop: "30px",
      }}
    >
      <h2 className="mb-4 text-center" style={{ color: "#333" }}>Tickets List</h2>
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
            <th>Project Name</th>
            <th>Spokesperson Email</th>
            <th>Spokesperson Name</th>
            <th>Spokesperson Number</th>
            <th>Team Lead</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projectData.length > 0 ? (
            projectData.map((data, index) => (
              <tr key={index}>
                <td>{data.projectName}</td>
                <td>{data.spokePersonEmail}</td>
                <td>{data.spokePersonName}</td>
                <td>{data.spokePersonNumber}</td>
                <td>{data?.team?.map(team => team?.teamLead?.map(teamLead => teamLead))}</td>
                <td>{data.description}</td>
                <td>
                  <Button
                    style={{
                      backgroundColor: "#007BFF",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      color: "#fff",
                      fontWeight: "bold",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
                    onClick={() => sendProjectId(data._id)}
                  >
                    View Tickets
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No projects available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default TaskProjectList;