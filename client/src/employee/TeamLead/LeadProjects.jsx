import axios from "axios";
import { useEffect, useState } from "react";
import { message } from "react-message-popup";
import 'bootstrap/dist/css/bootstrap.min.css';

const LeadProjects = ({ setConditionalComponent, teamId, setProjectId }) => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const projectsPerPage = 10;

    const fetchProjects = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };

            const response = await axios.get(`/api/employee/fetchProjectByTeamId/${teamId}`, config);

            console.log("response.data => ", response.data);

            setProjects(response?.data?.data);
        } catch (error) {
            console.log(error);
            message.error(error?.message);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleProject = (projectId) => {
        setConditionalComponent("viewTeamLeadProject");
        console.log("projectId => ", projectId);
        setProjectId(projectId);
    };

    const handleDocumentView = (projectId) => {
        console.log("View document for project:", projectId);
        // Implement the document view logic
    };

    const filteredProjects = projects.filter(project =>
        project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div
            className="container mt-4"
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                }}
            >
                <h2 style={{ margin: 0, color: "#333", fontWeight: "bold" }}>Projects That You Are Leading</h2>
                <input
                    type="text"
                    placeholder="Search by Project Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: "300px", marginBottom: "20px", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
                />
            </div>
            {/* <h2 className="text-center mb-4" style={{ color: "#333" }}>Projects That You Are Leading</h2>
            <input
                type="text"
                placeholder="Search by Project Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ maxWidth: "300px", marginBottom: "20px", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
            /> */}
            <table
                className="table table-striped table-bordered"
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
                        <th scope="col">Client Name</th>
                        <th scope="col">Project Name</th>
                        <th scope="col">Spokesperson Name</th>
                        <th scope="col">Spokesperson Email</th>
                        <th scope="col">Spokesperson Number</th>
                        <th scope="col">Description</th>
                        <th scope="col">Document</th>
                        <th scope="col">View Work</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProjects.map((project, index) => (
                        <tr key={index}>
                            <td>{project.clientName}</td>
                            <td>{project.projectName}</td>
                            <td>{project.spokePersonName}</td>
                            <td>{project.spokePersonEmail}</td>
                            <td>{project.spokePersonNumber}</td>
                            <td>{project.description}</td>
                            <td>
                                <button
                                    style={{
                                        backgroundColor: "#4CAF50",
                                        border: "none",
                                        padding: "8px 16px",
                                        borderRadius: "8px",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        transition: "background-color 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
                                    onClick={() => handleDocumentView(project._id)}
                                >
                                    View
                                </button>
                            </td>
                            <td>
                                <button
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
                                    onClick={() => handleProject(project._id)}
                                >
                                    View Your Work
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="d-flex justify-content-between mt-3">
                <button
                    className="btn btn-primary"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    className="btn btn-primary"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastProject >= filteredProjects.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default LeadProjects;
