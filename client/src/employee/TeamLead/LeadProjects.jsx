import axios from "axios";
import { useEffect, useState } from "react";
import { message } from "react-message-popup";
import 'bootstrap/dist/css/bootstrap.min.css';

const LeadProjects = ({ setConditionalComponent, teamId, setProjectId }) => {
    const [projects, setProjects] = useState([]);

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
            <h2 className="text-center mb-4" style={{ color: "#333" }}>Projects That You Are Leading</h2>

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
                    {projects?.map((project, index) => (
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
        </div>
    );
};

export default LeadProjects;