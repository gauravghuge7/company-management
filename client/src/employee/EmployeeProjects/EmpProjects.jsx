import {
  useEffect,
  useRef,
  useState,
} from 'react';

import axios from 'axios';
import {
  Button,
  Container,
  Form,
  Table,
} from 'react-bootstrap';

const EmpProjects = () => {

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [team, setTeam] = useState({});
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [tasksPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProjects = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
      const response = await axios.get('/api/employee/getProjects', config);

      console.log("response.data.data", response.data.data);

      if (response.data.success) {
        setProjects(response.data.data[0].project);
      }
    } catch (error) {
      console.log(error);
    }
  };




  const viewOurWork = async (projectId) => {
    try {
      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
      const response = await axios.get(`/api/employee/getTasksByProjectId/${projectId}`, config);

      console.log("response.data", response.data);

      console.log(response.data.data);


      if (response.data.success) {
        setTasks(response.data.data);
        setTeam(response.data.anythingElse)
        setSelectedProjectId(projectId);
      }


    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProjects = projects.filter(project =>
    project.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTasks = tasks.filter(task =>
    task.ticket?.ticketName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const forwardTicketRef = useRef(null);
  const [currentTask, setCurrentTask] = useState(null);
  const [forwardTicketOpen, setForwardTicketOpen] = useState(false);

  
  const openForwardTicketDialog = (taskId) => {

    setCurrentTask(taskId);
    


    if (forwardTicketRef.current) {

      forwardTicketRef.current.showModal();
    }
    setForwardTicketOpen(true);
  };

  const closeForwardTicketDialog = (e) => {

    console.log(e);

    if (forwardTicketRef.current) {
      forwardTicketRef.current.close();
    }
    setForwardTicketOpen(false);
    setCurrentTask(null);
  };


  const [sendTask, setSendTask] = useState({
    taskId: currentTask?._id,
    employeeId: null,
  });

  const handleForwardTicket = async () => {
    try {

      const body = {
        employeeId: sendTask.employeeId,
        taskId: sendTask.taskId,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      

      const response = await axios.post('/api/employee/forwardTicketsAndTasksToAnotherEmployee', body, config)
      
      
      console.log("response.data => ", response.data);

      

    } 
    catch (error) {
      console.log(error);  
    }
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
  
  
      <div className='col-md-12'>
        <h2 className="text-center mt-5" style={{ fontWeight: "bold", color: "#333" }}>Your Projects</h2>
        <Form.Control   


          type="text"
          placeholder="Search Projects"
          value={searchQuery}
          onChange={handleSearch}
          className="mb-4"
        />
      </div>
    
      <div className="table-responsive">
        <Table
          striped
          bordered
          hover
          className="text-center"
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <thead
            style={{
              backgroundColor: "#343a40",
              color: "#fff",
              fontSize: "1.1rem",
            }}
          >
            <tr>
              <th>#</th>
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
            {currentProjects.map((project, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{project.clientName}</td>
                <td>{project.projectName}</td>
                <td>{project.team}</td>
                <td>{project.spokePersonName}</td>
                <td>{project.spokePersonEmail}</td>
                <td>{project.spokePersonNumber}</td>
                <td>
                  <Button variant="primary" onClick={() => viewOurWork(project._id)}>View Your Work</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="primary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastProject >= filteredProjects.length}
        >
          Next
        </Button>
      </div>
      <hr />
      {tasks.length > 0 && selectedProjectId && (
        <section>
          <div className='col-md-12 d-flex justify-content-space-between align-items-center'>
            <div className='col-md-8'>
              <h2 className="text-center mt-5" style={{ fontWeight: "bold", color: "#333" }}>Your Tickets for Project</h2>
            </div>
            <div className='col-md-4 mt-4'>
              <Form.Control
                type="text"
                placeholder="Search Tickets"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>
          <Table
            striped
            bordered
            hover
            className="text-center mt-4"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <thead
              style={{
                backgroundColor: "#343a40",
                color: "#fff",
                fontSize: "1.1rem",
              }}
            >
              <tr>
                <th>#</th>
                <th>Ticket Type</th>
                <th>Ticket ID</th>
                <th>Ticket Name</th>
                <th>SAP Type</th>
                <th>Due Date</th>
                <th>Assigned To</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Description</th>
                <th>Document</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td>{index + 1}</td>
                  <td>{task.ticket ? "Client Ticket" : "Team Lead Task"}</td>
                  <td>{task.ticket ? task.ticket.ticketId : "-"}</td>
                  <td>{task.ticket ? task.ticket.ticketName : task.taskName}</td>
                  <td>{task.ticket ? task.ticket.saptype : ""}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.ticket ? task.ticket.assignedByName : task.teamLead}</td>
                  <td>{task.priority ? task.priority : task.ticket.priority}</td>
                  <td>{task.ticket ? task.ticket.status : task.status}</td>
                  <td>{task.ticket ? task.ticket.ticketDescription : task.description}</td>
                  <td>
                    <a href={task.ticket?.ticketDocument || task.taskDocument} target="_blank" rel="noreferrer">
                      <Button variant="primary">View</Button>
                    </a>
                  </td>
                  <td>
                    <Button 
                      variant="primary"
                      onClick={() => openForwardTicketDialog(task)}

                    >
                      Forward Ticket
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between mt-4">
            <Button
              variant="primary"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              onClick={() => paginate(currentPage + 1)}
              disabled={indexOfLastTask >= filteredTasks.length}
            >
              Next
            </Button>
          </div>
        </section>
      )}



      <main>
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
          <h2 className="text-xl mb-4">{currentTask?.taskName}</h2>
          <form
            onSubmit={() => handleForwardTicket()}
          >
            <div className="mb-4">
              <label htmlFor="employee" className="block mb-2">Select Employee</label>
              <select
                name="employee"
                id="employee"
                value={sendTask.employeeId}
                onChange={(e) => setSendTask({...sendTask, employeeId: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">Select employee</option>
                {team.employeeDetails && 
                  team.employeeDetails.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.employeeName}
                  </option>
                ))}
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
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
          </dialog>
        </section>

      </main>


    </Container>
  );
};

export default EmpProjects;
