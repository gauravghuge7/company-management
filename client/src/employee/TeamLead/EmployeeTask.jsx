

const EmployeeTask = () => {
   return (
      <div>
         
      </div>
   );
}

export default EmployeeTask;




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
  <div className='col-md-12 d-flex justify-content-space-between align-items-center'>
  <legend style={{ marginBottom: "20px", fontSize: "24px" }}> Client Ticket </legend>
  <input
type="text"
placeholder="Search Tickets"
value={searchQuery}
onChange={handleSearch}
className="form-control mb-3"
/></div>
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
        className="dark"
        style={{
          backgroundColor: "#007BFF",
          color: "#fff",
        }}
      >
        <tr>
          <th>#</th>
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
        {paginatedTickets.map((ticket, index) => (
          <tr key={index}>
            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
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
  <div className="d-flex justify-content-between mt-3">
    <Button
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
    >
      Previous
    </Button>
 
    <Button
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  </div>
</div>
</details>


      {/**** Employee Details */}
      <details
    className="card mb-3"
    style={{
      background: "#f0f4f8",
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
      color: "#333",
    }}
  >
        <summary  style={{ padding: "15px", cursor: "pointer", fontSize: "18px" }}> Employee Details </summary>
        <div className="card-body">
        <div className='col-md-12 d-flex justify-content-space-between align-items-center'>
  <legend style={{ marginBottom: "20px", fontSize: "24px" }}> Employee Details </legend>
  <input
type="text"
placeholder="Search Employees"
value={searchQuery}
onChange={handleSearch}
className="form-control mb-3"
/></div>
        
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
              {/* <button 
                className="btn btn-primary"
              
              >
                
                View Tickets List
              </button> */}
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