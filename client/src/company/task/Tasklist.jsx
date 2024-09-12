import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  Col,
  Container,
  Row,
  Table,
} from 'react-bootstrap';

const TaskList = ({ setConditionalComponent, projectId }) => {


  const [isEditing, setIsEditing] = useState(false);

  const [tasks, setTasks] = useState([
  
    { 
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

    },

  ]);


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    // Handle delete logic here (e.g., API call)
    console.log('Task deleted');
  };


  // fetch the tasks from the server

  const fetchTasks = async () => {

    try {


      const response = await axios.get(`/api/client/fetchTasks/${projectId}`);
      

      console.log("response.data.data => ", response.data.data);

      

      if(response.data.success) {
        console.log("ok");

        setTasks(response.data.data);

      }
      

    } 
    catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };




  useEffect(() => {
    fetchTasks();
  
  }, []);


  /**  unComment this code after */

  if(tasks && tasks?.length === 0) {
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
        <h2 style={{ margin: 0, color: "#333", fontWeight: "bold" }}>Task List</h2>

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
              
                <th>Ticket Status</th>
                <th>Assign BY Email</th>

                <th>ticket Document</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>

              {tasks.map((task, index) => (
                <tr key={index} style={{ textAlign: "center" }}> {/* Center align table text */}
                  <td>{index + 1}</td>
                  <td>{task.ticketName}</td>
                  <td>{task.priority}</td>
                  <td>{task.saptype}</td>
              
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
              
                
                <td>{task.assignedByEmail}</td>
                
                <td> 
                  <a href={task.ticketDocument} target="_blank" rel="noreferrer">
                    <button className="btn btn-primary">View</button>
                  </a>
                </td>  
                
                  <td>
                    <button className="btn btn-primary me-2" onClick={handleEdit}>Edit</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button> 



                                
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskList;
