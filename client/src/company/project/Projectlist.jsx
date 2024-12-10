import React, { useEffect, useState } from 'react';
import { Container, Table, Button, InputGroup, Pagination,FormControl } from 'react-bootstrap';
import axios from 'axios';
import EditProjectForm from './EditProjectForm';

const ProjectList = ({ setConditionalComponent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    projectName: '',
    spokePersonEmail: '',
    spokePersonName: '',
    spokePersonNumber: '',
    description: '',  
    teamLead: '',
    _id: "",
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleAddTask = (data) => {
    setIsEditing(true);
    setCurrentProject(data);
  };

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

  const filteredProjects = projectData.filter((project) =>
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = (updatedData) => {
    setProjectData(updatedData);
    setIsEditing(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isEditing) {
    return (
      <EditProjectForm 
        currentProject={currentProject} 
        setConditionalComponent={setConditionalComponent}
        onSave={handleSave}
        setIsEditing={setIsEditing}
      />
    );
  }

  return (
    <Container
      style={{
        background: "#f0f4f8",
        padding: "30px",
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
        {/* <h2 style={{ margin: 0, color: "#333" }}>Project List</h2>
        <InputGroup className="w-60" style={{ maxWidth: "25%" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search Projects"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              borderRadius: '8px', 
              padding: '12px', 
              border: '1px solid #ced4da',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginRight: '20px',
              maxWidth: "100%",
            }}
          />
        </InputGroup> */}


        <h2 style={{ margin: 0, color: "#333", fontWeight: "bold" }}>Project List</h2>
                <InputGroup style={{ maxWidth: "30%" }}>
                    <FormControl
                        placeholder="Search Project"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <InputGroup.Text>
                        <i className="bi bi-search"></i>
                    </InputGroup.Text>
                </InputGroup>

      </div>
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
            <th>Document</th>
            <th>Add Ticket</th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.length > 0 ? (
              currentItems.map((data, index) => (
                <tr key={index}>
                  <td>{data?.projectName}</td>
                  <td>{data?.spokePersonEmail}</td>
                  <td>{data?.spokePersonName}</td>
                  <td>{data?.spokePersonNumber}</td>
                  <td>{data?.team?.map(team => team?.teamLead?.map(teamLead => teamLead))}</td>
                  <td>{data?.description}</td>
                  <td>
                    <a href={data?.descriptionDocument} target="_blank" rel="noreferrer">
                      <Button
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          color: "#007BFF",
                          fontWeight: "bold",
                          transition: "background-color 0.3s ease",
                        }}
                      
                      >
                      <i className="bi bi-eye-fill"></i>
                      </Button>
                    </a>
                  </td>
                  <td>
                    <Button 
                      style={{
                        backgroundColor: "transparent",
                        border: "#007BFF",
                        padding: "8px 16px",
                        Size: "large",
                        
                        borderRadius: "8px",
                        color: "#007BFF",
                        fontWeight: "bold",
                        transition: "background-color 0.3s ease",
                        marginRight: "10px"
                      }}
                     
                      onClick={() => handleAddTask(data)}
                    >
                      <i className="bi bi-plus-square-fill"></i>
                    </Button>
                    {/* <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No projects available</td>
              </tr>
            )
          }
        </tbody>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1}
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
        >
        <i className="bi bi-arrow-left"></i>
        </Button>
        <Button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages}
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
        >
        <i className="bi bi-arrow-right"></i>
        </Button>
      </div>
    </Container>
  );
};

export default ProjectList;
