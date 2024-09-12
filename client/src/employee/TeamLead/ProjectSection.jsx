import 'bootstrap/dist/css/bootstrap.min.css';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';

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

  const [assignTask, setAssignTask] = useState(false);
  const assignRef = useRef();


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
        <section>
            {
              tasks.map((task, index) => (
                <div key={index} className="container mt-5">
                   <p>{task.taskName}</p>
                </div>
              ))
            }
        </section>
      
      </details>


            {/* Dialoing Box */}

      <main className=''>
        {
          assignTask && 
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50  z-50">


            
      


          {/* Add scrollable behavior */}
          <dialog
            open={assignRef}
            className="bg-white p-6 rounded-md shadow-lg max-w-3xl w-full max-h-screen overflow-y-auto z-50"
          >
          <button
            className="relative top-0 right-0 float-right bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={() => setAssignTask(false)}
          >
            Cancel
          </button>


            <div className="container">
              <h2 className="text-center text-xl font-semibold mb-4">Assign Task</h2>

              <div className="">
                {/* Form Section */}

                <form>

                  <div className="mb-4">
                    <label className="block font-medium">Task Name</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded-md"
                      placeholder="Enter task name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Assigned By</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded-md"
                      placeholder="Enter assigned by"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Assigned To</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded-md"
                      placeholder="Enter assigned to"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Priority</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded-md"
                      placeholder="Enter priority"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Due Date</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded-md"
                      placeholder="Enter due date"
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block font-medium">All Tickets </label>


                    <select
                      className="w-full border p-2 rounded-md"
                      placeholder="Enter due date"
                    >
                      <option value="">Select Ticket</option>

                      <option value="">Select Own Work</option>


                      {
                        tickets.map((ticket, index) => (
                          <option value={ticket._id} key={index}>
                            {ticket.ticketName}
                          </option>
                        ))
                      }

                    </select>

                    
                  

                  </div>

                  
                  <div className="mb-4">
                    <label className="block font-medium">Ticket Description</label>
                    <textarea
                      className="w-full border p-2 rounded-md"
                      placeholder="Enter ticket description"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Ticket Document</label>
                    <input
                      type="file"
                      className="w-full border p-2 rounded-md"
                      placeholder="Enter ticket document"
                    />
                  </div>

                  <button
                    type="button"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Assign Task
                  </button>
                </form>
          
                
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
