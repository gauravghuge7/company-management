import { useState } from 'react';

const AssignTask = ({ tickets, setAssignTask, assignRef }) => {



      const [own, setOwn] = useState(false);

      

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


                              <div className="mb-4">
                                    <label className="block font-medium">All Tickets </label>


                                    <select
                                          className="w-full border p-2 rounded-md"
                                          placeholder="Enter due date"
                                          value={own}
                                          onChange={(e) => setOwn(e.target.value)}
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
                              <label className="block font-medium">Task Name</label>
                              <input
                              type="text"
                              className="w-full border p-2 rounded-md"
                              placeholder="Enter task name"
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
                              type="date"
                              className="w-full border p-2 rounded-md"
                              placeholder="Enter due date"
                              />
                              </div>
                              
                              

                              
                              <div className="mb-4">
                              <label className="block font-medium">Task Description</label>
                              <textarea
                              className="w-full border p-2 rounded-md"
                              placeholder="Enter ticket description"
                              ></textarea>
                              </div>

                              <div className="mb-4">
                              <label className="block font-medium">Task Document</label>
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
      );
}

export default AssignTask;
