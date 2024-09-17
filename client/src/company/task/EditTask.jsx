import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';

const EditTask = ({ currentTask, setIsEditOpen, setCurrentTask }) => {


   const handleSubmit = () => {
      try {

         console.log("currentTask => ", currentTask);


         


      } 
      catch (error) {
         console.log(error);
      }
   }


   const handlePopupClose = (e) => {
      e.preventDefault();

      console.log(e);
      setIsEditOpen(false);
   }

   return (
      <div className='w-[100%] h-[100%] overflow-x-scroll'>
      <button 
         onClick={handlePopupClose}
         className='absolute top-20 right-20 p-2 m-2 text-white bg-red-500 rounded-full'
         >
         Cancel
         
      </button>
      <Container className="mt-5">
      <Row className="justify-content-md-center overflow-scroll">
         <Col md={8}>
            <Card className="p-4 border-0" style={{ borderRadius: '20px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)' }}>
                  <Card.Body>
                     <h2 className="text-center mb-4" style={{ fontWeight: 'bold' }}>Create New Task</h2>
                     <Form onSubmit={handleSubmit}>

                          {/*  ticket name  */}
                        <Form.Group controlId="companyName" className="mb-3">
                           <Form.Label>Ticket Name</Form.Label>
                           <Form.Control
                                 type="text"
                                 name="companyName"
                                 value={currentTask?.ticketName}
                                 onChange={(e) => setCurrentTask({ ...currentTask, ticketName: e.target.value })}   
                                 required
                                 style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                           />
                        </Form.Group>

                        <Form.Group controlId="priority" className="mb-3">
                           <Form.Label>Priority</Form.Label>
                           <Form.Control
                              as="select"
                              name="priority"
                              value={currentTask.priority}
                              onChange={(e) => setCurrentTask({ ...currentTask, priority: e.target.value })}
                              required
                              style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                           >
                              <option value="">Select Priority</option>
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                           </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="priority" className="mb-3">
                           <Form.Label>SAP Type</Form.Label>
                           <Form.Control
                                 as="select"
                                 name="saptype"
                                 value={currentTask.saptype}
                                 onChange={(e) => setCurrentTask({ ...currentTask, saptype: e.target.value })}
                                 required
                                 style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                           >
                                 <option value="">Select Priority</option>
                                 <option value="High">SAP ABAP</option>
                                 <option value="Medium">SAP MM</option>
                                 <option value="Low">SAP </option>
                           </Form.Control>
                        </Form.Group>



                        <Form.Group controlId="dueDate" className="mb-3">
                           <Form.Label>Due Date</Form.Label>
                           <Form.Control
                                 type="date"
                                 name="dueDate"
                                 value={currentTask.dueDate}
                                 required
                                 style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                           />
                        </Form.Group>

                        <Form.Group controlId="assignName" className="mb-3 flex flex-col">
                           <Form.Label>desciption</Form.Label>

                           <textarea cols="30" rows="10"
                           value={currentTask.taskDetail}
                           onChange={(e) => setCurrentTask({ ...currentTask, taskDetail: e.target.value })}
                           style={{ borderRadius: '12px', padding: '18px', boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)' }}
                           className='w-full border-1'
                        >
                           {currentTask.taskDetail}

                        </textarea>

                        </Form.Group>




                        <Button
                           variant="primary"
                           type="submit"
                           style={{
                                 backgroundColor: '#17a2b8', // Teal color
                                 border: 'none',
                                 borderRadius: '12px',
                                 padding: '12px 24px',
                                 boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                                 color: '#fff',
                                 fontWeight: 'bold',
                                 transition: 'background-color 0.3s ease, transform 0.2s ease',
                           }}
                           className="w-100"
                           onMouseEnter={(e) => {
                                 e.target.style.backgroundColor = '#138496'; // Darker teal on hover
                                 e.target.style.transform = 'scale(1.05)'; // Slight scale-up on hover
                           }}
                           onMouseLeave={(e) => {
                                 e.target.style.backgroundColor = '#17a2b8'; // Original teal when not hovering
                                 e.target.style.transform = 'scale(1)'; // Reset scale when not hovering
                           }}
                        >
                           Submit Ticket
                        </Button>
                     </Form>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </Container>
         
   
      </div>
   );
}



export default EditTask;
