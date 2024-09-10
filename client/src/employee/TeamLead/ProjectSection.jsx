import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProjectSection = ({ setConditionalComponent, projectId }) => {

  const [projects, setProjects] = useState({
    projectName: "Project Name",
    clientName: "Client Name",
    description: "Description",
    spokePersonName: "Spoke Person Name",
    spokePersonNumber: 1234567890,
    spokePersonEmail: "Spoke Person Email",
    projectId: "Project Id",
  });

  const [team, setTeam] = useState({
    teamId: "Team Id",
    teamName: "Team Name",
    createdAt: ""
  });

  const [employeeDetails, setEmployeeDetails] = useState([{
    employeeName: "Employee Name",
    employeeEmail: "Employee Email",
    designation: "Designation",
    _id: "Employee Id",
  }]);

  const [tickets, setTickets] = useState([{
    ticketName: "Ticket Name",
    ticketId: "Ticket Id",
    ticketDescription: "Ticket Description",
    priority: "Priority",
    status: "Status",
    assignedTo: "Assigned To",
    assignedByEmail: "Assigned By Email",
    assignedByName: "Assigned By Name",
  }]);

  const [tasks, setTasks] = useState([{

    taskName: "Task Name",
    taskId: "Task Id",
    taskDescription: "Task Description",
    priority: "Priority",
    status: "Status",
    assignedTo: "Assigned To",
    assignedByEmail: "Assigned By Email",
    assignedByName: "Assigned By Name",

  }]);

  const [isTaskOpen, setIsTaskOpen] = useState(false);


  const fetchProjects = async () => {
    console.log("projectId => ", projectId);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    try {
      const response = await axios.get(`/api/employee/fetchProjectById/${projectId}`, config);

      console.log("response.data => ", response.data);

      if (response.data.success === true) {
        setProjects(response?.data?.data[0]);
        setTeam(response?.data?.data[0]?.team[0]);
        console.log("employee => ", response?.data?.data[0]?.team[0].employeeDetails);
        setEmployeeDetails(response?.data?.data[0]?.team[0].employeeDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-3" onClick={() => setConditionalComponent("teamLead")}>
        Back
      </button>


      <details title='Project Detail' className="card mb-3">
        <summary> Project Detail </summary>
        <div className="card-body">
          <h2 className="card-title">Project Section</h2>
          <div className="row">
            <div className="col-md-6">
              <h3 className="card-title">{projects.projectName}</h3>
              <p className="card-text"><strong>Description:</strong> {projects.description}</p>
              <p className="card-text"><strong>Spoke Person:</strong> {projects.spokePersonName}</p>
              <p className="card-text"><strong>Phone:</strong> {projects.spokePersonNumber}</p>
              <p className="card-text"><strong>Email:</strong> {projects.spokePersonEmail}</p>
            </div>
          </div>
        </div>
      </details>

      <details className="card mb-3">
        <summary> Team Details </summary>
        <div className="card-body">
          <legend>Team Details</legend>
          <div className="row">
            <div className="col-md-6">
              <h3 className="card-title">{team.teamName}</h3>
              <p className="card-text"><strong>Team ID:</strong> {team.teamId}</p>
              <p className="card-text"><strong>Created At:</strong> {team.createdAt}</p>
            </div>
          </div>
        </div>
      </details>

      <details className="card">
        <summary> Employee Details </summary>
        <div className="card-body">
          <legend>Employee Details</legend>
        
          <div className="row">
            {employeeDetails.map((employee, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{employee.employeeName}</h5>
                    <p className="card-text"><strong>Email:</strong> {employee.employeeEmail}</p>
                    <p className="card-text"><strong>Designation:</strong> {employee.designation}</p>
                    <div className="row mb-3">
            <div className="col-md-6">
              <button className="btn btn-primary">View Task List</button>
            </div>
            <div className="col-md-6 text-end">
              <button className="btn btn-success">Add Task</button>
            </div>
          </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </details>

      <br/>

      <details>
        <summary> Task List </summary>
      
      </details>

    </div>
  );
};

export default ProjectSection;
