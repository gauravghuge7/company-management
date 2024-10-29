import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Col, Container, Row, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { message } from 'react-message-popup';

const TaskList = ({ setConditionalComponent }) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTask, setCurrentTask] = useState(null);
  const [sendTask, setSendTask] = useState({ taskId: null, employeeId: null });
  const forwardTicketRef = useRef(null);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/employee/getEmployeeAllTasks');
      if (response.data.success) {
        message.success(response.data.message);
        setTasks(response.data.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openForwardTicketDialog = (taskId) => {
    const task = tasks.find(t => t._id === taskId);
    setCurrentTask(task);
    setSendTask({ taskId: taskId, employeeId: null });
    if (forwardTicketRef.current) {
      forwardTicketRef.current.showModal();
    }
  };

  const closeForwardTicketDialog = () => {
    if (forwardTicketRef.current) {
      forwardTicketRef.current.close();
    }
    setCurrentTask(null);
  };

  const handleForwardTicket = async (event) => {
    event.preventDefault();
    try {
      const body = {
        employeeId: sendTask.employeeId,
        taskId: sendTask.taskId,
      };
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      };
      const response = await axios.post('/api/employee/forwardTicketsAndTasksToAnotherEmployee', body, config);
      message.success(response.data.message);
      closeForwardTicketDialog(); // Close the dialog after forwarding
    } catch (error) {
      message.error(error.message);
    }
  };

  const tasksPerPage = 10;
  const filteredTasks = tasks.filter(task =>
    task.taskName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    task.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedTasks = filteredTasks.slice(
    currentPage * tasksPerPage,
    (currentPage + 1) * tasksPerPage
  );

  return (
    <Container
      style={{
        background: "#f0f4f8",
        padding: "90px",
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
        <h2 style={{ margin: 0, color: "#333", fontWeight: "bold" }}>Ticket List</h2>
        <InputGroup style={{ maxWidth: "30%" }}>
          <FormControl
            placeholder="Search Ticket"
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
                backgroundColor: "#343a40",
                color: "#fff",
                textAlign: "center",
                fontSize: "1.1rem",
              }}
            >
              <tr>
                <th>#</th>
                <th>Ticket Name</th>
                <th>Priority</th>
                <th>SAP Type</th>
                <th>Due Date</th>
                <th>Assigned To Team</th>
                <th>Assigned By Name</th>
                <th>Assigned By Email</th>
                <th>Task Detail</th>
                <th>Document</th>
                <th>Task Forward</th>
              </tr>
            </thead>
            <tbody>
              {displayedTasks.map((task, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td>{index + 1 + currentPage * tasksPerPage}</td>
                  <td>{task.taskName || task.ticket?.ticketName}</td>
                  <td>{task.priority || task.ticket?.priority}</td>
                  <td>{task.saptype || task.ticket?.saptype}</td>
                  <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                  <td>{task.assignedTo || task.ticket?.assignedTo}</td>
                  <td>{task.assignedByName || task.ticket?.assignedByName}</td>
                  <td>{task.assignedByEmail || task.ticket?.assignedByEmail}</td>
                  <td>{task.description || task.ticket?.ticketDescription}</td>
                  <td>
                    <a href={task.taskDocument || task.ticket?.ticketDocument} target="_blank" rel="noreferrer">
                      <button style={{
                        backgroundColor: "transparent",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        color: "#007BFF",
                        fontWeight: "bold",
                        transition: "background-color 0.3s ease",
                      }} className="btn btn"><i className="bi bi-eye-fill"></i></button>
                    </a>
                  </td>
                  <td>
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "5px",
                        color: "#007BFF",
                        fontWeight: "bold",
                        transition: "background-color 0.3s ease",
                      }}
                      variant="primary"
                      onClick={() => openForwardTicketDialog(task._id)}
                    >
                      Forward
                    </Button>
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
              <i className="bi bi-arrow-left"></i>
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={(currentPage + 1) * tasksPerPage >= filteredTasks.length}
              className="btn btn-primary"
            >
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </Col>
      </Row>
      
      <section className="d-flex justify-content-center align-items-center">
        <dialog
          ref={forwardTicketRef}
          className="p-6 rounded-lg shadow-lg bg-white"
          style={{
            width: '300px',
            border: '1px solid #ccc',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
          }}
        >
          <h2 className="text-xl font-bold mb-4">Forward Ticket</h2>
          <h3 className="text-xl mb-4">{currentTask?.taskName}</h3>
          <form onSubmit={handleForwardTicket}>
            <div className="mb-4">
              <label htmlFor="employee" className="block mb-2">Select Employee</label>
              <select
                name="employee"
                id="employee"
                value={sendTask.employeeId}
                onChange={(e) => setSendTask({ ...sendTask, employeeId: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Select employee</option>
                {/* Add your employee options here */}
              </select>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Forward
              </button>
              <button
                type="button"
                onClick={closeForwardTicketDialog}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </form>
        </dialog>
      </section>
    </Container>
  );
};

export default TaskList;
