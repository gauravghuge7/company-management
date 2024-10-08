import {
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import {
  Col,
  Container,
  Row,
  Table,
  Form,
  Button,
} from 'react-bootstrap';

import EditTask from './EditTask';

const TaskList = ({ setConditionalComponent, projectId }) => {
  const editRef = useRef(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({
    ticketName: "",
    assignedByName: "ABC Company", 
    priority: "High",
    saptype: "SAP ABAP",    
    status: "",
    ticketCreateDate: "2022-01-01",
    dueDate: "2022-01-01",
    assignName: "John Doe",
    assignedByEmail: "johndoe@gmail.com",
    assignTeam: "ABC Team",  
    ticketDocument: "https://example.com/ticketDocument.pdf"  
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const tasksPerPage = 10;

  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    // Implement delete functionality
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`/api/client/fetchTasks/${projectId}`);
      if(response.data.success) {
        setTasks(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.ticketName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if(tasks && tasks.length === 0) {
    return (
      <div className="container mt-5">
        <h2 className="text-center">No Tickets found...</h2>
      </div>
    );
  }

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
        <h2 style={{ margin: 0, color: "#333", fontWeight: "bold" }}>Tickets List</h2>
        <Form.Control
          type="text"
          placeholder="Search by Ticket Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "300px" }}
        />
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
                <th>Ticket Status</th>
                <th>Assign BY Email</th>
               
                <th>Ticket Description</th>
                 <th>Ticket Document</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td>{indexOfFirstTask + index + 1}</td>
                  <td>{task.ticketName}</td>
                  <td>{task.priority}</td>
                  <td>{task.saptype}</td>
                  <td>{task.status}</td>
                  <td>{task.assignedByEmail}</td>
                 
                  <td>{task.ticketDescription}</td>
                  <td>
                    <a href={task.ticketDocument} target="_blank" rel="noreferrer">
                      <Button variant=""    style={{ color:"#007BFF"  }}>  <i class="bi bi-eye-fill"></i></Button>
                    </a>
                  </td>
                  <td>
                   <div className='d-flex'> <Button variant=""    style={{ color:"#007BFF"  }} className="me-2" onClick={() => handleEdit(task)}>
                    <i class="bi bi-pencil-square"></i>
                    </Button>
                    <Button variant="" onClick={handleDelete}
                     style={{ color:"red"  }}><i class="bi bi-trash"></i></Button></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between">
            <Button
              variant="primary"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
             <i class="bi bi-arrow-left"></i>
            </Button>
            <Button
              variant="primary"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastTask >= filteredTasks.length}
            >
              <i class="bi bi-arrow-right"></i>
            </Button>
          </div>
        </Col>
      </Row>

      {isEditOpen && (
        <dialog
          open={isEditOpen}
          className='absolute inset-0 top-20 z-50 w-[70%] flex flex-col items-center justify-center bg-gray-50 bg-opacity-50 scroll-m-0'
        >
          <EditTask
            currentTask={currentTask}
            setIsEditOpen={setIsEditOpen}
            setCurrentTask={setCurrentTask}
          />
        </dialog>
      )}

      {isDeleteOpen && (
        <dialog open={isDeleteOpen} onClick={handleDelete}>
          <h2>Are you sure you want to delete this ticket?</h2>
          <Button variant="danger">Yes</Button>
          <Button variant="secondary">No</Button>
        </dialog>
      )}
    </Container>
  );
};

export default TaskList;
