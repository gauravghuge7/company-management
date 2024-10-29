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
    });

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
                taskName: ticketDetails.ticketName,
                priority: ticketDetails.priority,
                dueDate: ticketDetails.dueDate,
                employee: currentEmployee,
                description: ticketDetails.ticketDescription,
                document: ticketDetails.ticketDocument,
                tickets: own,
                assignBy: teamLead
            };

            setMsg("Sending Ticket...");
            const response = await axios.post(`/api/employee/assignTaskToEmployee`, body, config);

            if (response.data.success === true) {
                setMsg("");
                message?.success("Ticket Assigned Successfully");
                setAssignTask(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
            <dialog
                open={assignRef}
                className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full overflow-y-auto z-50"
                style={{
                    borderRadius: '20px',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                    width: '90%', // Responsive width
                    maxWidth: '600px', // Maximum width to avoid excessive stretching
                    maxHeight: '100vh', // Prevent overflow on small screens
                }}
            >
                <button
                    className="relative top-0 right-0 float-right bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                    onClick={() => setAssignTask(false)}
                    style={{
                        borderRadius: '12px',
                        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    Cancel
                </button>

                <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">Assign Task</h2>

                <form onSubmit={sendTicketToEmployee}>
                    <div className="space-y-6">
                        {/* Select Ticket Section */}
                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium">Select Ticket</label>
                            <select
                                className="w-full border-gray-300 p-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                value={own}
                                onChange={(e) => setOwn(e.target.value)}
                            >
                                <option value="">Select Ticket</option>
                                <option value="ownWork">Select Own Work</option>
                                {tickets.map((ticket, index) => (
                                    <option value={ticket._id} key={index}>
                                        {ticket.ticketName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Task Name */}
                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium">Task Name</label>
                            <input
                                type="text"
                                value={ticketDetails.ticketName}
                                onChange={(e) => setticketDetails({...ticketDetails, ticketName: e.target.value})}
                                className="w-full border-gray-300 p-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter task name"
                                style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                            />
                        </div>

                        {/* Priority */}
                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium">Priority</label>
                            <select
                                value={ticketDetails.priority}
                                onChange={(e) => setticketDetails({...ticketDetails, priority: e.target.value})}
                                className="w-full border-gray-300 p-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                            >
                                <option value="" disabled>Select priority</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        </div>

                        {/* Due Date */}
                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium">Due Date</label>
                            <input
                                type="date"
                                value={ticketDetails.dueDate}
                                onChange={(e) => setticketDetails({...ticketDetails, dueDate: e.target.value})}
                                className="w-full border-gray-300 p-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                            />
                        </div>

                        {/* Task Description */}
                        <div className="mb-4">
                            <label className="block text-gray-600 font-medium">Task Description</label>
                            <textarea
                                value={ticketDetails.ticketDescription}
                                onChange={(e) => setticketDetails({...ticketDetails, ticketDescription: e.target.value})}
                                className="w-full border-gray-300 p-3 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter ticket description"
                                style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                            ></textarea>
                        </div>

                        {/* Task Document */}
                        {own === "ownWork" && (
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium">Task Document</label>
                                <input
                                    type="file"
                                    onChange={(e) => setticketDetails({...ticketDetails, ticketDocument: e.target.files[0]})}
                                    className="w-full border-gray-300 p-3 rounded-md shadow-sm"
                                    style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center mt-8 space-x-6">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-600"
                            style={{
                                backgroundColor: '#008080', // Teal color
                                border: 'none',
                                borderRadius: '12px',
                                padding: '12px 24px',
                                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                                color: '#fff',
                                fontWeight: 'bold',
                                transition: 'background-color 0.3s ease, transform 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#006666'; // Darker teal on hover
                                e.target.style.transform = 'scale(1.05)'; // Slight scale-up on hover
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#008080'; // Original teal when not hovering
                                e.target.style.transform = 'scale(1)'; // Reset scale when not hovering
                            }}
                        >
                            Assign Task
                        </button>

                        {msg && (
                            <p className="mt-4 text-green-600 text-lg">{msg}</p>
                        )}
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default AssignTask;
