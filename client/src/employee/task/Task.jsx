import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { message } from 'react-message-popup';

const TaskList = ({ setConditionalComponent }) => {

  const [tasks, setTasks] = useState([
    { 
      companyName: "ABC Company", 
      priority: "High",
      saptype: "SAP ABAP",    
      taskDetail: "Task Detail",
      ticketCreateDate: "2022-01-01",
      dueDate: "2022-01-01",
      assignName: "John Doe",
      assignEmail: "johndoe@gmail.com",
      assignTeam: "ABC Team",
      document: "https://example.com/document.pdf"  
    },

  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');




  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/employee/getEmployeeAllTasks');

      console.log("response.data => ", response.data);

      console.log("response.data.data => ", response.data.data);

      if(response.data.success === true) {
        message.success(response.data.message);
        setTasks(response?.data?.data);
      }
      
    } 
    catch (error) {
      message.error(error.message);
    }
  };

 

  useEffect(() => {
    fetchTasks();

  }, [1]);

  // const filteredTasks = tasks.filter((task) =>
  //   task.companyName
  // );

  // const tasksPerPage = 10;

  // const displayedTasks = filteredTasks.slice(
  //   currentPage * tasksPerPage,
  //   (currentPage + 1) * tasksPerPage
  // );

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ margin: 0, color: "#333", fontWeight: "bold" }}>Task List</h2>
      <div>  <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              width: "100%",
            }}
          /></div>
      </div>

      <Row className="justify-content-md-center mt-5">
        <Col md={12}>
         
          <Table
            striped
            bordered
            hover
            style={{
              backgroundColor: "#fff",
              color: "#333",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <thead
              style={{
                backgroundColor: "#343a40", // Darker gray header
                color: "#fff",
                textAlign: "center",  // Center align header text
                fontSize: "1.1rem",
              }}
            >
              <tr>
                <th>#</th>
                <th>Ticket Name</th>
                <th>Priority</th>
                <th>SAP Type</th>
                <th>Due Date</th>
                <th>Assign To Team</th>
                <th>Assign BY Name</th>
                <th>Assign BY Email</th>
                <th>Task Detail</th>
                <th>Document</th>
                <th>Task Forward</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index} style={{ textAlign: "center" }}> {/* Center align table text */}
                  <td>{index + 1 }</td>
                  <td>{task.taskName || task.ticket?.ticketName}</td>
                  <td>{task.priority || task.ticket?.priority}</td>
                  <td>{task.saptype || task.ticket?.saptype}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.assignedTo || task.ticket?.assignedTo}</td>
                  <td>{task.assignedByName || task.ticket?.assignedByName}</td>
                  <td>{task.assignedByEmail || task.ticket?.assignedByEmail}</td>
                  <td>{task.description || task.ticket?.ticketDescription}</td>
                  <td> 
                    <a href={task.taskDocument || task.ticket?.ticketDocument} target="_blank" rel="noreferrer">
                      <button className="btn btn-primary">View</button>
                    </a>
                  </td>  
                  <td>
                    <button className="btn btn-primary me-2">Forward</button>
                  </td> 
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
              className="btn btn-primary"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={(currentPage + 1)}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskList;
