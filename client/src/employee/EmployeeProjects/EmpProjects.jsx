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
              <th>Email</th>
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

                <h2 className="text-center">Your Tasks</h2>

                <main>
                  {
                    tasks?.map  && tasks?.map((task, index) => (

                      <div key={index} className="card mb-3">

                        { 
                          task?.ticket 
                          ?  
                           /** Task from directly client  */
                          <div className="card-body">
                            <h3> Client Ticket </h3>
                            <h5 className="card-title">{task.ticket.ticketName}</h5>
                            <p className="card-text">{task.ticket.saptype}</p>
                            <p className="card-text">Assigned To: {task.ticket.assignedByName}</p>
                            <p className="card-text">Priority: {task.ticket.priority}</p>
                            <p className="card-text">Status: {task.ticket.status}</p>
                            
                            <p className="card-text">Description: {task.ticket.ticketDescription}</p>


                            <a href={task.ticket.ticketDocument} target='_blank' rel="noreferrer" className="btn btn-primary">Download Document</a>

                            <button
                              className="btn btn-primary"
                            
                            > 
                              forward Ticket 
                            </button>

                          </div>

                          : 
                             /**   task from team lead */
                          <div className="card-body">
                            <h5 className="card-title">{task.taskName}</h5>
                            <p className="card-text">{task.description}</p>
                            <p className="card-text">Assigned To: {task.assignedTo}</p>
                            <p className="card-text">Priority: {task.priority}</p>
                            <p className="card-text">Status: {task.status}</p>
                            
                            <p className="card-text">Description: {task.description}</p>


                            <a href={task.taskDocument} target='_blank' rel="noreferrer" className="btn btn-primary">Download Document</a>

                            <button 
                              className="btn btn-primary"
                              
                            >
                              forward Ticket
                            </button>
                          </div>

                        }

                        
                      </div>
                    ))
                  }
                
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
