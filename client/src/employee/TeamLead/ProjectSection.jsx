import 'bootstrap/dist/css/bootstrap.min.css';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import { Button } from 'react-bootstrap';

import AssignTask from './AssignTask';

const ProjectSection = ({ setConditionalComponent, projectId }) => {

  const [projects, setProjects] = useState({
    projectName: "Project Name",
    clientName: "Client Name",
    description: "Description",
    spokePersonName: "Spoke Person Name",
    spokePersonNumber: 1234567890,
    spokePersonEmail: "Spoke Person Email",
    projectId: "Project Id",
    _id: "",
  });

  const [team, setTeam] = useState({
    teamId: "Team Id",
    teamName: "Team Name",
    teamLead: "Team Lead",
    createdAt: "",
    _id: ""
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
    _id: "",
    ticketDocument: "",
    dueDate: "",

  }]);


  const [tasks, setTasks] = useState([{

    taskName: "Task Name",
    taskId: "Task Id",
    taskDescription: "Task Description",
    priority: "Priority",
    taskDocument: "",
    status: "Status",
    assignedTo: "Assigned To",
    assignedByEmail: "Assigned By Email",
    assignedByName: "Assigned By Name",

  }]);

  const [assignTask, setAssignTask] = useState(false);
  const assignRef = useRef();

  const [employeeTask, setEmployeeTask] = useState(false);
  const employeeTaskRef = useRef();

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

      // response.data.data[0].ticket

      console.log("response.data.data[0].ticket => ", response.data.data[0].ticket);
      console.log("employee => ", response?.data?.data[0]?.team[0].employeeDetails);

      if (response.data.success === true) {

        setProjects(response?.data?.data[0]);
        setTeam(response?.data?.data[0]?.team[0]);
        setEmployeeDetails(response?.data?.data[0]?.team[0].employeeDetails);
        setTickets(response?.data?.data[0]?.ticket);


      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);



  const fetchTasks = async () => {

    try {

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      };

      const response = await axios.get(`/api/employee/getAllTasks/${projectId}`, config);

      console.log("response.data => ", response.data);

      if (response.data.success === true) {
        setTasks(response?.data?.data);
      }
      

    } 
    catch (error) {
      console.log(error);
      
    }
  }




  const fetchEmployeeTasks = async () => {
    
  }

  /**    for assign task to employee we getting the employee id from the employee list */
  const [currentEmployee, setCurrentEmployee] = useState("");


  const assignTaskToEmployee = async (employee) => {

    console.log("employee => ", employee);
    setCurrentEmployee(employee);
    setAssignTask(true);
  }



  return (

    <div className="container mt-4">

      {/**  back Button  */}
      <button 
        className="btn btn-primary mb-3" 
        onClick={() => setConditionalComponent("teamLead")}
      >
        Back
      </button>

      
      <details
    className="card mb-3"
    style={{
      background: "#f0f4f8",
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
      color: "#333",
    }}
  >
  <summary style={{ padding: "15px", cursor: "pointer", fontSize: "18px" }}> Client Ticket </summary>
  <div className="card-body">
    <legend style={{ marginBottom: "20px", fontSize: "24px" }}> Client Ticket </legend>
    <div className="table-responsive">
      <table
        className="table table-bordered table-hover"
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <thead
          className="thead-dark"
          style={{
            backgroundColor: "#007BFF",
            color: "#fff",
          }}
        >
          <tr>
            <th>Ticket Name</th>
            <th>Ticket ID</th>
            <th>Priority</th>
            <th>SAP Type</th>
            <th>Assigned To</th>
            <th>Assigned By Email</th>
            <th>Assigned By Name</th>
            <th>Status</th>
            <th>Document</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.ticketName}</td>
              <td>{ticket._id}</td>
              <td>{ticket.priority}</td>
              <td>{ticket.saptype}</td>
              <td>{ticket.assignedTo}</td>
              <td>{ticket.assignedByEmail}</td>
              <td>{ticket.assignedByName}</td>
              <td>{ticket.status}</td>
              <td>
                <a href={ticket ? ticket.ticketDocument : ""} target="_blank" rel="noreferrer">
                  <button
                    className="btn btn-primary"
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
                  >
                    View
                  </button>
                </a>
              </td>
              <td>{ticket.ticketDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</details>


      {/**** Employee Details */}
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
              <button 
                className="btn btn-primary"
              
              >
                
                View Tickets List
              </button>
            </div>
            <div className="col-md-6 text-end">
              <button 
                className="btn btn-success"
                onClick={() => assignTaskToEmployee(employee._id)}
              >
                Add Tickets
              
              </button>
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

      { /**  Task List of Employees */}
    <details
      className="card mb-3"
      onClick={() => fetchTasks()}
      style={{
        background: "#f0f4f8",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
        color: "#333",
      }}
    >
    <legend style={{ margin: "20px", fontSize: "24px" }}> Employees Ticket </legend>
      <summary
        style={{
          padding: "15px",
          cursor: "pointer",
          fontSize: "18px",
      
          borderBottom: "1px solid #ddd",
          // backgroundColor: "#007BFF",
          color: "#000",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        Tickets List
      </summary>

      <div className="card-body" style={{ padding: "20px" }}>

        <div className="table-responsive">
          
          <table
            className="table table-bordered table-hover"
            style={{
              backgroundColor: "#fff",
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
                <th>#</th>
                <th className="border px-4 py-2">Ticket Type</th>
                <th className="border px-4 py-2">Tickets Name</th>
                <th className="border px-4 py-2">Priority</th>
                <th className="border px-4 py-2">SAP Type</th>
                <th className="border px-4 py-2">Due Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Assigned To</th>
                <th className="border px-4 py-2">Assigned By Email</th>
                <th className="border px-4 py-2">Assigned By Name</th>
                <th className="border px-4 py-2">Tickets Description</th>
                <th className="border px-4 py-2">Tickets Document</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{task.ticket ? "Client Ticket" : "Team Lead Task"}</td>
                  <td className="border px-4 py-2">{task.taskName}</td>
                  <td className="border px-4 py-2">{task.priority}</td>
                  <td className="border px-4 py-2">{task.saptype}</td>
                  <td className="border px-4 py-2">{task.dueDate}</td>
                  <td className="border px-4 py-2">{task.status}</td>
                  <td className="border px-4 py-2">{task.assignedTo}</td>
                  <td className="border px-4 py-2">{task.assignedByEmail}</td>
                  <td className="border px-4 py-2">{task.assignedByName}</td>
                  <td className="border px-4 py-2">{task.taskDescription}</td>
                  <td className="border px-4 py-2">
                    <a href={task.taskDocument} target="_blank" rel="noreferrer">
                      <button
                        className="btn"
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
                      >
                        View
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </details>


            {/* Dialoing Box */}

      <main className=''>
        {
          assignTask && 
          <AssignTask 
            teamLead={team._id}
            currentEmployee={currentEmployee}
            projectId={projectId}
            tickets={tickets} 
            setAssignTask={setAssignTask} 
            assignRef={assignRef}
          />
        }
      
      </main>


      {/**  employee task dialog  */}
      <main className=''>
        {
          employeeTask && 
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
            {/* Large scrollable dialog */}
            <dialog
              open={employeeTaskRef}
              className="bg-white p-6 rounded-md shadow-lg max-w-6xl w-full max-h-screen h-auto overflow-y-auto z-50"
            >
              <button
                className="relative top-0 right-0 float-right bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => setEmployeeTask(false)}
              >
                Cancel
              </button>

              <div className="container mx-auto">
                <h2 className="text-center text-2xl font-semibold mb-4">Assign Task</h2>

                <div className="overflow-x-auto">
                  {/* Table Section */}
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Task Name</th>
                        
                        <th className="border px-4 py-2">Priority</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Assigned To</th>
                        <th className="border px-4 py-2">Assigned By Email</th>
                        <th className="border px-4 py-2">Assigned By Name</th>
                        <th className="border px-4 py-2">Task Description</th>
                        <th className="border px-4 py-2">Task Document</th>
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
                  </table>
                </div>
              </div>
            </dialog>
          </div>

  
        }
      
      </main>


    </div>
  );
};

export default ProjectSection;
