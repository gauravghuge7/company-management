import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const TaskProjectList = ({ setConditionalComponent, setProjectId }) => {
  const [projectData, setProjectData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const projectsPerPage = 10;

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

  const filteredProjects = projectData.filter(project =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
      <h2 style={{ margin: 0, color: "#333", fontWeight: "bold" }}>Projects List</h2>
      <Form.Control
        type="text"
        placeholder="Search by Project Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ maxWidth: "300px", marginBottom: "20px" }}
      /></div>
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
          {currentProjects.length > 0 ? (
            currentProjects.map((data, index) => (
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
      <div className="d-flex justify-content-between mt-3">
        <Button
          variant="primary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastProject >= filteredProjects.length}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default TaskProjectList;
