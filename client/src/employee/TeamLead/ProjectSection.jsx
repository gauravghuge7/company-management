import 'bootstrap/dist/css/bootstrap.min.css';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';

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
  });

  const [team, setTeam] = useState({
    teamId: "Team Id",
    teamName: "Team Name",
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



  const taskList = document.getElementById('taskList');


  const fetchTasks = async () => {

    try {

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      };

      const response = await axios.get(`/api/employee/fetchTasks/${team._id}`, config);

      console.log("response.data => ", response.data);

      if (response.data.success === true) {
        setTasks(response?.data?.data);


        setEmployeeTask(true);

      }
      

    } 
    catch (error) {
      console.log(error);
      
    }
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

      {/**** Project Detail */}
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

      {/**** Team Details */}
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


      {/**** Ticket Details */}
      <details className="card mb-3">
        <summary> Ticket Details </summary>
        <div className="card-body">
          <legend>Ticket Details</legend>
          <div className="row">
            {
              tickets.map((ticket, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{ticket.ticketName}</h5>
                      <p className="card-text"><strong>Ticket ID:</strong> {ticket._id}</p>
                      <p className="card-text"><strong>Ticket Description:</strong> {ticket.ticketDescription}</p>
                      <p className="card-text"><strong>Priority:</strong> {ticket.priority}</p>
                      <p className="card-text"><strong>Status:</strong> {ticket.status}</p>
                      <p className="card-text"><strong>Assigned To:</strong> {ticket.assignedTo}</p>
                      <p className="card-text"><strong>Assigned By Email:</strong> {ticket.assignedByEmail}</p>
                      <p className="card-text"><strong>Assigned By Name:</strong> {ticket.assignedByName}</p>
                      <p className="card-text"><strong>Ticket Document:</strong> {ticket.ticketDocument}</p>
                      <p className="card-text"><strong>Due Date:</strong> {ticket.dueDate}</p>
                    </div>
                  </div>
                </div>
              ))
            }
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
                onClick={() => fetchTasks()}
              >
                
                View Task List
              </button>
            </div>
            <div className="col-md-6 text-end">
              <button 
                className="btn btn-success"
                onClick={() => setAssignTask(true)}
              >
                Add Task
              
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
      <details>
        <summary> Task List </summary>
        <section id='taskList'>
            {
              tasks.map((task, index) => (
                <div key={index} className="container mt-5">
                  <p>{task.taskName}</p>
                  <p>{task.taskDescription}</p>
                  <p>{task.priority}</p>
                  <p>{task.status}</p>
                  <p>{task.assignedTo}</p>
                  <p>{task.assignedByEmail}</p>
                  <p>{task.assignedByName}</p>
                </div>
              ))
            }
        </section>
      
      </details>


            {/* Dialoing Box */}

      <main className=''>
        {
          assignTask && 
          <AssignTask 
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
                        <th className="border px-4 py-2">Task Description</th>
                        <th className="border px-4 py-2">Priority</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Assigned To</th>
                        <th className="border px-4 py-2">Assigned By Email</th>
                        <th className="border px-4 py-2">Assigned By Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tasks.map((task, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{task.taskName}</td>
                          <td className="border px-4 py-2">{task.taskDescription}</td>
                          <td className="border px-4 py-2">{task.priority}</td>
                          <td className="border px-4 py-2">{task.status}</td>
                          <td className="border px-4 py-2">{task.assignedTo}</td>
                          <td className="border px-4 py-2">{task.assignedByEmail}</td>
                          <td className="border px-4 py-2">{task.assignedByName}</td>
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
