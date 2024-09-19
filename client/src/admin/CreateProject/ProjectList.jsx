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

    const projectsPerPage = 10;

    const handleAddTask = () => {
        setIsEditing(true);
    };

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

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDelete = () => {
        // Handle delete logic here (e.g., API call)
        console.log('Project deleted');
    };

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
                    <h2 style={{ margin: 0, color: "#333" }}>Project List</h2>
                </Col>
                <Col></Col>
                <Col>   </Col>
                <Col >
                    <InputGroup>
                        <FormControl
                            placeholder="Search Projects"
                            aria-label="Search Projects"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={handleSearch}
                            style={{ borderRadius: "8px" , maxWidth: "100%", marginRight: "10px" }}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <table className="table table-striped table-bordered" style={{ backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden" }}>
                <thead style={{ backgroundColor: "#007BFF", color: "#fff" }}>
                    <tr>
                        <th>#</th>
                        <th>Project Name</th>
                        <th>Client Name</th>
                        <th>Spokesperson Email</th>
                        <th>Spokesperson Name</th>
                        <th>Spokesperson Number</th>
                        <th>Team Lead</th>
                        <th>Description</th>
                        <th>Document</th>
                        <th>Actions</th>
                        <th>Tickets</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProjects.map((data, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstProject + index + 1}</td>
                            <td>{data.projectName}</td>
                            <td>{data.clientName}</td>
                            <td>{data.spokePersonEmail}</td>
                            <td>{data.spokePersonName}</td>
                            <td>{data.spokePersonNumber}</td>
                            <td>{data.team?.map((teamMember) => teamMember.teamLead).join(', ')}</td>
                            <td>{data.description}</td>
                            <td>
                                <a href={data.documents} target="_blank" rel="noreferrer">
                                    <Button
                                        style={{
                                            backgroundColor: "#007BFF",
                                            border: "none",
                                            borderRadius: "8px",
                                            color: "#fff",
                                            fontWeight: "bold",
                                            transition: "background-color 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
                                    >
                                        View
                                    </Button>
                                </a>
                            </td>
                            <td>
                                <Button
                                    style={{
                                        backgroundColor: "#007BFF",
                                        border: "none",
                                        borderRadius: "8px",
                                        marginBottom: "10px",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        marginRight: "10px",
                                        transition: "background-color 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#007BFF")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
                                    onClick={handleEdit}
                                >
                                    Edit
                                </Button>
                                <Button
                                    style={{
                                        backgroundColor: "#007BFF",
                                        border: "none",
                                        borderRadius: "8px",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        transition: "background-color 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#007BFF")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </Button>
                            </td>
                            <td>
                                <Button
                                    style={{
                                        backgroundColor: "#007BFF",
                                        border: "none",
                                        borderRadius: "8px",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        transition: "background-color 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
                                    onClick={handleAddTask}
                                >
                                    Add Ticket
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
                    onClick={() => paginate(currentPage - 1)}
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
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastProject >= filteredProjects.length}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default ProjectList;