import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const EmpProjects = () => {
  const [projects, setProjects] = useState([
    {
      projectId: "",
      projectName: "",
      description: "",
      clientName: "",
      team: "",
      spokePersonName: "",
      spokePersonEmail: "",
      spokePersonNumber: "",
      createdAt: "",
      updatedAt: "",
    },
  ]);

  const fetchProjects = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.get(`/api/employee/getProjects`, config);

      console.log(response.data);

      if (response.data.success === true) {
        setProjects(response.data?.data[0]?.project);
        console.log("projects => ", projects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (!projects?.length || projects?.length === 0) {
    return (
      <div className="d-flex justify-content-center">
        <h1>You are not working on any project right now</h1>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Projects</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Client Name</th>
              <th>Project Name</th>
              <th>Team</th>
              <th>Spokesperson Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((project, index) => (
              <tr key={index}>
                <td>{project.clientName}</td>
                <td>{project.projectName}</td>
                <td>{project.team}</td>
                <td>{project.spokePersonName}</td>
                <td>{project.spokePersonEmail}</td>
                <td>{project.spokePersonNumber}</td>
                <td>
                  <button className="btn btn-primary">View Your Work</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpProjects;
