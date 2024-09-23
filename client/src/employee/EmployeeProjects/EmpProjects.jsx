import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  Button,
  Container,
  Table,
} from 'react-bootstrap';

const EmpProjects = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null); // Track selected project ID

  const fetchProjects = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
      const response = await axios.get('/api/employee/getProjects', config);
      if (response.data.success) {
        setProjects(response.data.data[0].project);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewOurWork = async (projectId) => {
    try {
      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
      const response = await axios.get(`/api/employee/getTasksByProjectId/${projectId}`, config);


      console.log("response => ",response);

      if (response.data.success) {
        setTasks(response.data.data);
        setSelectedProjectId(projectId); // Set the selected project ID
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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
      <h2 className="text-center mb-4" style={{ fontWeight: "bold", color: "#333" }}>Your Projects</h2>
      <div className="table-responsive">
        <Table
          striped
          bordered
          hover
          className="text-center"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <thead
            style={{
              backgroundColor: "#343a40",
              color: "#fff",
              fontSize: "1.1rem",
            }}
          >
            <tr>
              <th>Client Name</th>
              <th>Project Name</th>
              <th>Team</th>
              <th>Spokesperson Name</th>
              <th>Spokesperson Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project.clientName}</td>
                <td>{project.projectName}</td>
                <td>{project.team}</td>
                <td>{project.spokePersonName}</td>
                <td>{project.spokePersonEmail}</td>
                <td>{project.spokePersonNumber}</td>
                <td>
                  <Button variant="primary" onClick={() => viewOurWork(project._id)}>View Your Work</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

   
      {tasks.length > 0 && selectedProjectId && (
        <section>
          <h2 className="text-center mt-5" style={{ fontWeight: "bold", color: "#333" }}>Your Tickets for Project </h2>
          <Table
            striped
            bordered
            hover
            className="text-center mt-4"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <thead
              style={{
                backgroundColor: "#343a40",
                color: "#fff",
                fontSize: "1.1rem",
              }}
            >
              <tr>
                <th>Ticket Type</th>
                <th>Ticket ID</th>
                <th>Ticket Name</th>
                <th>SAP Type</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Description</th>
                <th>Document</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.ticket ? "Client Ticket" : "Team Lead Task"}</td>
                  <td>{task.ticket ? task.ticket.ticketId : "-"}</td>
                  <td>{task.ticket ? task.ticket.ticketName : task.taskName}</td>
                  <td>{task.ticket ? task.ticket.saptype : ""}</td>
                  <td>{task.ticket ? task.ticket.assignedByName : task.teamLead}</td>
                  <td>{task.priority ? task.priority : task.ticket.priority }</td>
                  <td>{task.status ? task.status : task.ticket.status}</td>
                  <td>{task.description ? task.description : task.ticket.description}</td>
                  <td>
                    <a href={task.ticket?.ticketDocument || task.taskDocument} target="_blank" rel="noreferrer">
                      <Button variant="primary">View</Button>
                    </a>
                  </td>
                  <td>
                    <Button variant="primary">Forward Ticket</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </section>
      )}
    </Container>
  );
};

export default EmpProjects;