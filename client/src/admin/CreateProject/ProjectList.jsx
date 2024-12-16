import { useEffect, useState } from 'react';
import EditProjectForm from './EditProjectForm';
import axios from 'axios';
import { message } from 'react-message-popup';
import { Button, InputGroup, FormControl, Row, Col } from 'react-bootstrap';



const ProjectList = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [projectData, setProjectData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');




  const handleEdit = async (id) => {
    try {
      const response = await axios.put(`/api/admin/editProject/${id}`, projectData);
      if (response.status === 200) {
        message.success('Project updated successfully');
        getAllProjects();
      } else {
        message.error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      message.error('Failed to update project');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/admin/deleteProject/${id}`);
      if (response.status === 200) {
        message.success('Project deleted successfully');
        getAllProjects();
      } else {
        message.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      message.error('Failed to delete project');
    }
  };
    



























    const projectsPerPage = 10;

    

    const getAllProjects = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await axios.get('/api/admin/project', config);

            console.log('response => ', response);

            if (response.data.success === true) {
                message.success(response.data.message);
                setProjectData(response?.data?.data?.project);
            }
        } catch (error) {
            console.log(error);
            message.error(error?.message);
        }
    };

    useEffect(() => {
        getAllProjects();
    }, []);

    const handleSave = (updatedData) => {
        setProjectData(updatedData);
        setIsEditing(false);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProjects = projectData.filter((project) =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isEditing) {
        return <EditProjectForm projectData={projectData} onSave={handleSave} />;
    }

    return (
        <div
            className="container mt-5"
            style={{
                background: "#f0f4f8",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                color: "#333",
                maxWidth: "100%",
            }}
        >
            <Row className="mb-4">
                <Col>
                <h2 style={{ margin: 0, color: "#333", fontWeight: "bold" }}>Project List</h2>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col>
                    {/* <InputGroup>
                        <FormControl
                            placeholder="Search Projects"
                            aria-label="Search Projects"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{ borderRadius: "8px", maxWidth: "100%", marginRight: "10px" }}
                        />
                    </InputGroup> */}


                    
                <InputGroup style={{ maxWidth: "100%" }}>
                    <FormControl
                        placeholder="Search Projects"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <InputGroup.Text>
                        <i className="bi bi-search"></i>
                    </InputGroup.Text>
                </InputGroup>
                </Col>
            </Row>
            <table className="table table-striped table-bordered" style={{ backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden" }}>
                <thead style={{ backgroundColor: "#007BFF", color: "#fff" }}>
                    <tr>
                        <th>#</th>
                        <th>Project Name</th>
                       
                        <th>Spokesperson Email</th>
                        <th>Spokesperson Name</th>
                        <th>Spokesperson Number</th>
                        <th>Team Lead</th>
                        <th>Description</th>
                        <th>Document</th>
                        <th>Actions</th>
                        {/* <th>Tickets</th> */}
                    </tr>
                </thead>
                <tbody>
                    {currentProjects.map((data, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstProject + index + 1}</td>
                            <td>{data.projectName}</td>
                          
                            <td>{data.spokePersonEmail}</td>
                            <td>{data.spokePersonName}</td>
                            <td>{data.spokePersonNumber}</td>
                            <td>{data.team?.map((teamMember) => teamMember.teamLead).join(', ')}</td>
                            <td>{data.description}</td>
                            <td>
                                <a href={data.descriptionDocument} target="_blank" rel="noreferrer">    
                                    <Button style={{ background: "transparent", border: "none" }}>
                                            <i className="bi bi-eye-fill" style={{ fontSize: "16px", color: "#007BFF" }}></i>   
                                            
                                    </Button>
                                </a>
                            </td>
                            <td>
    <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button style={{ background: "transparent", border: "none" }} onClick={() => handleEdit(projectData._id)}>
            <i className="bi bi-pencil-square" style={{ fontSize: "16px", color: "blue", cursor: "pointer" }}></i>
        </Button>
        <Button style={{ background: "transparent", border: "none" }} onClick={() => handleDelete(projectData._id)}>
            <i className="bi bi-trash-fill" style={{ fontSize: "16px", color: "red", cursor: "pointer" }}></i>
        </Button>
    </div>
</td>


                            {/* <td>
                                <Button style={{ background: "transparent", border: "none" }} onClick={handleAddTask}>
                                    <i className="bi bi-plus-square-fill" style={{ fontSize: "16px", color: "#007BFF" }}></i>
                                </Button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between mt-3">
                <Button
                    style={{
                        backgroundColor: "primary",
                        border: "none",
                        color: "white",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "primary")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "primary")}
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <i className="bi bi-arrow-left" style={{ fontSize: "16px", color: "white" }}></i>
                </Button>
                <Button
                    style={{
                        backgroundColor: "primary",
                        border: "none",
                        color: "white",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "primary")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "primary")}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastProject >= filteredProjects.length}
                >
                    <i className="bi bi-arrow-right" style={{ fontSize: "16px", color: "white" }}></i>
                </Button>
            </div>
        </div>
    );
};

export default ProjectList;
