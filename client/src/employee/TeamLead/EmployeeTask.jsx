

// const EmployeeTask = () => {
//    return (
//       <div>
         
//       </div>
//    );
// }

// export default EmployeeTask;


// <details
// className="card mb-3"
// onClick={() => fetchTasks()}
// style={{
//   background: "#f0f4f8",
//   borderRadius: "12px",
//   boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
//   color: "#333",
// }}
// > 
//       <div className='col-md-12 d-flex justify-content-space-between align-items-center'>
     
//      <div className='md-6'> 
//     </div>
//      </div>
//       <div className="card-body">
//        <div className='col-md-12 d-flex justify-content-space-between align-items-center'>
//        <legend style={{ marginBottom: "20px", fontSize: "24px" }}> Client Ticket </legend>
//         <input
//       type="text"
//       placeholder="Search Tickets"
//       value={searchTerm}
//       onChange={handleSearch}
//       className="form-control mb-3"
//     />
//        </div>
//         <div className="table-responsive">
//           <table
//             className="table table-bordered table-hover"
//             style={{
//               backgroundColor: "#fff",
//               borderRadius: "12px",
//               overflow: "hidden",
//             }}
//           >
//             <thead
//               className="thead-dark"
//               style={{
//                 backgroundColor: "#007BFF",
//                 color: "#fff",
//               }}
//             >
//               <tr>
//                 <th>#</th>
//                 <th>Ticket Name</th>
//                 <th>Ticket ID</th>
//                 <th>Priority</th>
//                 <th>SAP Type</th>
//                 <th>Assigned To</th>
//                 <th>Assigned By Email</th>
//                 <th>Assigned By Name</th>
//                 <th>Status</th>
//                 <th>Document</th>
//                 <th>Description</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentTickets.map((ticket, index) => (
//                 <tr key={index}>
//                   <td>{indexOfFirstTicket + index + 1}</td>
//                   <td>{ticket.ticketName}</td>
//                   <td>{ticket._id}</td>
//                   <td>{ticket.priority}</td>
//                   <td>{ticket.saptype}</td>
//                   <td>{ticket.assignedTo}</td>
//                   <td>{ticket.assignedByEmail}</td>
//                   <td>{ticket.assignedByName}</td>
//                   <td>{ticket.status}</td>
//                   <td>
//                     <a href={ticket ? ticket.ticketDocument : ""} target="_blank" rel="noreferrer">
//                       <button
//                         className="btn btn-primary"
//                         style={{
//                           backgroundColor: "#4CAF50",
//                           border: "none",
//                           padding: "8px 16px",
//                           borderRadius: "8px",
//                           color: "#fff",
//                           fontWeight: "bold",
//                           transition: "background-color 0.3s ease",
//                         }}
//                         onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
//                         onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
//                       >
//                         View
//                       </button>
//                     </a>
//                   </td>
//                   <td>{ticket.ticketDescription}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="d-flex justify-content-between">
//           <Button
//             onClick={() => paginate(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </Button>
//           <Button
//             onClick={() => paginate(currentPage + 1)}
//             disabled={indexOfLastTicket >= filteredTickets.length}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </details>