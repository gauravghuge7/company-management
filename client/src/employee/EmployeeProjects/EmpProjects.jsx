import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

const EmpProjects = () => {

  
  const [tickets, setTickets] = useState({
    ticketName: "",
    description: "",
    priority: "",
    status: "",
    ticketDocument: "",
    createdAt: "",
    updatedAt: "",
    assignedTo: "",
    projectId: "",
  
  });

  const [projects, setProjects] = useState([
    {
      projectId: "",
      projectName: "",
      description: "",
      clientName: "",
      team: "",
      spokePersonName: "",
      spokePersonEmail: "",
      spokePersonNumber: "",
      createdAt: "",
      updatedAt: "",
    },
  ]);


  const [tasks, setTasks] = useState([
    {
      description: "",
      document: "",
      priority: "",
      status: "",
      taskName: "",
      assignedTo: "",
      taskDocument: "",
      ticket: ""
    },

  ],

  );

  const [employee, setEmployee] = useState([
    {
      employeeName: "",
      employeeEmail: "",
      _id: ""
    }
  ]);


  const fetchEmployee = async (teamId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const response = await axios.get(`/api/employee/getEmployeeByTeam/${teamId}`, config);

      console.log("response.data => ", response.data);

      
    } 
    catch (error) {
      console.log(error);
    }
  };


  const [isForwaredOpen, setIsForwaredOpen] = useState(false);





  const fetchProjects = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.get(`/api/employee/getProjects`, config);

      console.log(response.data);

      if (response.data.success === true) {
        setProjects(response.data?.data[0]?.project);
        console.log("projects => ", projects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewOurWork = async (projectId) => {
    try {

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.get(`/api/employee/getTasksByProjectId/${projectId}`, config);

      console.log("response.data => ", response.data);

      if (response.data.success === true) {

        setTasks(response.data?.data);

        

      }

    }
    catch (error) {
      console.log(error);
    }
  };



  const setForwardTask = (teamId) => {


    fetchEmployee(teamId);
    setIsForwaredOpen(true);
  }





  useEffect(() => {
    fetchProjects();
    fetchEmployee();  
    
  }, []);

  if(!projects ) {
    return (
      <div className="container mt-5">
        <h2> you are not working on any project right now </h2>
      </div>
    )
  }


  if (projects && projects?.length === 0) {
    return (
      <div className="d-flex justify-content-center">
        <h1>You are not working on any project right now</h1>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Projects</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
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
            {projects?.map((project, index) => (
              <tr key={index}>
                <td>{project.clientName}</td>
                <td>{project.projectName}</td>
                <td>{project.team}</td>
                <td>{project.spokePersonName}</td>
                <td>{project.spokePersonEmail}</td>
                <td>{project.spokePersonNumber}</td>
                <td>
                  <button 
                    className="btn btn-primary"
                    onClick={() => viewOurWork(project._id)}
                  >
                  View Your Work
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <footer>
            {/* Footer */}

            
            {
              tasks.length > 0  ? 
              
              <section>

                <h2 className="text-center">Your Tickiets</h2>

                <main>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th> Tickit Type</th>
        <th> Tickit Id</th>
        <th> Ticket Name</th>
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
      {
        tasks?.map && tasks?.map((task, index) => (
          <tr key={index}>
            {
              task?.ticket 
              ? (
                <>
                  <td>Client Ticket</td>
                  <td>{task.ticket.ticketId}</td>
                  <td>{task.ticket.ticketName}</td>
                  <td>{task.ticket.saptype}</td>
                  <td>{task.ticket.assignedByName}</td>
                  <td>{task.ticket.priority}</td>
                  <td>{task.ticket.status}</td>
                  <td>{task.ticket.ticketDescription}</td>
                  <td>
                    <a href={task.ticket.ticketDocument} target='_blank' rel="noreferrer" className="btn btn-primary">view</a>
                  </td>
                  <td>
                    <button className="btn btn-primary">Forward Ticket</button>
                  </td>
                </>
              )
              : (
                <>
                  <td>Team Lead Task</td>
                  <td>{task.taskName}</td>
                  <td>-</td>
                  <td>{task.assignedTo}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>{task.description}</td>
                  <td>
                    <a href={task.taskDocument} target='_blank' rel="noreferrer" className="btn btn-primary">Download Document</a>
                  </td>
                  <td>
                    <button className="btn btn-primary">Forward Ticket</button>
                  </td>
                </>
              )
            }
          </tr>
        ))
      }
    </tbody>
  </table>
</main>

                
              
              </section>
              : null

            }
      
      </footer>


      <main>
            {
              isForwaredOpen && 
              <div>
                <h2>Forwarded Ticket</h2>
                <p>Ticket Name: {tickets.ticketName}</p>

                <section>
                  <label>Select Team Member</label>
                  <select className="form-select" aria-label="Default select example">
                    <option selected > Choose...</option>
                    {

                    }
                  </select>
                </section>
              
              </div>
            }
      </main>

    </div>
  );
};

export default EmpProjects;