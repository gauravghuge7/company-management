import { useState } from 'react';

import axios from 'axios';
import { message } from 'react-message-popup';

const AssignTask = ({ teamLead, currentEmployee, projectId, tickets, setAssignTask, assignRef }) => {



      const [own, setOwn] = useState(false);

      const [msg, setMsg] = useState("");

      const [ticketDetails, setticketDetails] = useState({
            ticketName: "",
            ticketId: own,
            ticketDescription: "",
            priority: "",
            status: "",
            assignedTo: "",
            assignedByEmail: "",
            assignedByName: "",
            _id: "",
            ticketDocument: "",
            dueDate: "",
      })



                  // employee,
                  // description,
                  // teamLead,
                  // assignBy,
                  // tickets

      const sendTicketToEmployee = async(e) => {

            e.preventDefault();
            try {

                  const config = {
                        headers: {
                              'Content-Type': 'multipart/form-data',
                        },
                        withCredentials: true,
                  };


                  const body = {

                        project: projectId,
                        employee: currentEmployee,
                        description: ticketDetails.ticketDescription,
                        document: ticketDetails.ticketDocument,
                        tickets: own,
                        assignBy: teamLead
                  }

                  setMsg("Sending Ticket...");
                  const response = await axios.post(`/api/employee/assignTaskToEmployee`, body, config);

                  console.log("response.data => ", response.data);

                  if(response.data.success === true) {
                     setMsg("");
                     message?.success("Ticket Assigned Successfully");
                     setAssignTask(false);
                  }



            } 
            catch (error) {
                  console.log(error);
            }
      }

      

      return (
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

                               {/** Select ticketDetails Section */}
                              <div className="mb-4">
                                    <label className="block font-medium">All ticketDetails </label>


                                    <select
                                          className="w-full border p-2 rounded-md"
                                          placeholder="Enter due date"
                                          value={own}
                                          onChange={(e) => setOwn(e.target.value)}
                                    >

                                          <option value="">Select Ticket</option>

                                          <option value="ownWork">Select Own Work</option>


                                          {
                                                tickets.map((ticket, index) => (
                                                <option value={ticket._id} key={index}>
                                                {ticket.ticketName}
                                                </option>
                                                ))
                                          }

                                    </select>

                              </div>

                                    {/** Task Name */}
                              <div className="mb-4">
                                    <label className="block font-medium">Task Name</label>
                                    <input
                                    type="text"
                                    value={ticketDetails.ticketName}
                                    onChange={(e) => setticketDetails({...ticketDetails, ticketName: e.target.value})}
                                    className="w-full border p-2 rounded-md"
                                    placeholder="Enter task name"
                                    />
                              </div>
                              
                              {/** Priority */}
                              <div className="mb-4">
                                    <label className="block font-medium">Priority</label>
                                    <input
                                    type="text"
                                    value={ticketDetails.priority}
                                    onChange={(e) => setticketDetails({...ticketDetails, priority: e.target.value})}
                                    className="w-full border p-2 rounded-md"
                                    placeholder="Enter priority"
                                    />
                              </div>

                              {/** Due Date */}
                              <div className="mb-4">
                                    <label className="block font-medium">Due Date</label>
                                    <input
                                    type="date"
                                    value={ticketDetails.dueDate}
                                    onChange={(e) => setticketDetails({...ticketDetails, dueDate: e.target.value})}
                                    className="w-full border p-2 rounded-md"
                                    placeholder="Enter due date"
                                    />
                              </div>

                              <div className="mb-4">
                                    <label className="block font-medium">Task Description</label>
                                    <textarea
                                    value={ticketDetails.ticketDescription}
                                    onChange={(e) => setticketDetails({...ticketDetails, ticketDescription: e.target.value})}
                                    className="w-full border p-2 rounded-md"
                                    placeholder="Enter ticket description"
                                    ></textarea>
                              </div>
                              
                              {/** Task Description & Document */}

                              { own === "ownWork" &&
                              <section>

                                    <div className="mb-4">

                                          <label className="block font-medium">Task Document</label>
                                          <input
                                          type="file"
                                          onChange={(e) => setticketDetails({...ticketDetails, ticketDocument: e.target.files[0]})}
                                          className="w-full border p-2 rounded-md"
                                          placeholder="Enter ticket document"
                                          />
                                    </div>
                              </section>

                              }

                              <main className='flex justify-center gap-20'>
                              
                                    <button
                                          type="submit"
                                          onClick={sendTicketToEmployee}
                                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    >
                                          Assign Task
                                    </button>

                                    <section className="mt-4">
                                    {
                                          msg &&
                                          <p className=" rounded-full  border-r-4 border-t-4 text-center text-xl h-8 w-8 border-red-500 animate-spin"></p>
                                    }
                                    </section>
                              
                              </main>
                              
                        </form>
                  
                        
                        </div>
                        </div>
                  </dialog>
            </div>
      );
}

export default AssignTask;
