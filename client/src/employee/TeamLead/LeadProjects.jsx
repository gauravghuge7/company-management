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

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Projects That You Are Leading</h2>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {projects?.map((project, index) => (
                    <div
                        key={index}
                        className="col"
                    >
                        <div className="card shadow-sm rounded-lg h-100">
                            <div className="card-body">
                                <h5 className="card-title text-center">{project.clientName}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{project.projectName}</h6>
                                <p className="card-text">{project.description}</p>
                                <p className="card-text"><small className="text-muted">{project._id}</small></p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleProject(project._id)}
                                >
                                    View Your Work
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeadProjects;
