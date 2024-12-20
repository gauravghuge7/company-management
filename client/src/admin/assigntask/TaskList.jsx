import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button, InputGroup, FormControl } from 'react-bootstrap';

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
    {     
      companyName: "XYZ Company",   
      priority: "Medium",   
      saptype: "SAP ABAP",    
      taskDetail: "Task Detail",      
      ticketCreateDate: "2022-01-01",
      dueDate: "2022-01-01",
      assignbyteam: "XYZ Team",
      assignName: "John Doe",
      assignEmail: "johndoe@gmail.com",
      assignTeam: "ABC Team",
      document: "https://example.com/document.pdf"
    },
    // Add more tasks here
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const tasksPerPage = 10;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    // Handle delete logic here (e.g., API call)
    console.log('Task deleted');
  };

  const filteredTasks = tasks.filter(task =>
    task.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.saptype.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assignEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assignTeam.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    console.log('Task List Data Fetched:', tasks);
  }, [tasks]);

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
        <InputGroup style={{ maxWidth: "30%", marginRight: "10px" }}>
          <FormControl
            placeholder="Search Tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroup.Text>
            <i className="bi bi-search"></i>
          </InputGroup.Text>
        </InputGroup>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.slice(indexOfFirstTask, indexOfLastTask).map((task, index) => (
                <tr key={index} style={{ textAlign: "center" }}> {/* Center align table text */}
                  <td>{index + 1}</td>
                  <td>{task.companyName}</td>
                  <td>{task.priority}</td>
                  <td>{task.saptype}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.assignTeam}</td>
                  <td>{task.assignName}</td>
                  <td>{task.assignEmail}</td>
                  <td>{task.taskDetail}</td>
                  <td> 
                    <a href={task.document} target="_blank" rel="noreferrer">
                      <i className="bi bi-eye-fill" style={{ fontSize: "16px" }}></i> {/* View icon */}
                    </a>
                  </td>
                  <td>
                    <i
                      className="bi bi-pencil-square me-2"
                      style={{ fontSize: "16px", cursor: "pointer", color: "blue" }} 
                      onClick={() => handleEdit(task)}
                    ></i> {/* Edit icon */}
                    <i
                      className="bi bi-trash3-fill"
                      style={{ fontSize: "16px", cursor: "pointer", color: "red" }} 
                      onClick={() => handleDelete(task)}
                    ></i> {/* Delete icon */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="primary"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <i className="bi bi-arrow-left"></i>
            </Button>
            <Button
              variant="primary"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastTask >= filteredTasks.length}
            >
              <i className="bi bi-arrow-right"></i>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskList;
