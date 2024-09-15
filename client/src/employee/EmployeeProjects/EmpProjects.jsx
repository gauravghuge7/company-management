import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

const EmpProjects = () => {

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
      taskDocument: ""
    },
  ]);


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

  useEffect(() => {
    fetchProjects();
  }, []);

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
              tasks && 
              
              <section>

                <h2 className="text-center">Your Tasks</h2>

                <main>
                  {
                    tasks.map((task, index) => (
                      <div key={index} className="card mb-3">
                        <div className="card-body">
                          <h5 className="card-title">{task.taskName}</h5>
                          <p className="card-text">{task.description}</p>
                          <p className="card-text">Assigned To: {task.assignedTo}</p>
                          <p className="card-text">Priority: {task.priority}</p>
                          <p className="card-text">Status: {task.status}</p>
                          
                          <p className="card-text">Description: {task.description}</p>


                          <a href={task.taskDocument} target='_blank' rel="noreferrer" className="btn btn-primary">Download Document</a>
                        </div>
                      </div>
                    ))
                  }
                
                </main>
                
              
              </section>
            }
      
      </footer>
    </div>
  );
};

export default EmpProjects;
