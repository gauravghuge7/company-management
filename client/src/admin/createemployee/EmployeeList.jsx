import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Table, Button, FormControl, InputGroup, Modal, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { setEmployeeData } from "../../Redux/SetDataToRedux/EmployeeData";
import { useNavigate } from "react-router-dom";


const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const employeesPerPage = 10;

  const navigate = useNavigate();

  const data = useSelector((state) => state.employeeReducer.employee);

  const fetchEmployees = setEmployeeData();

  useEffect(() => {
    fetchEmployees;
    setEmployees(data);
  }, [data]);

  const filteredEmployees = employees.filter((employee) =>
    employee?.employeeName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const handleDelete = async(id) => {
    // Implement delete functionality
    console.log(`Delete employee with id: ${id}`);

    try {
      const response = await axios.delete(`/api/admin/deleteEmployee/${id}`);
      console.log("API Response:", response.data);

      if (response.data.success) {
        setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== id));
        alert("Employee deleted successfully!");
      }

    } 
    catch (error) {
      console.error("Error deleting employee:", error);
    }

  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {

    if (!selectedEmployee) return;

    console.log("Submitting edit for:", selectedEmployee);

    try {
      const response = await axios.put(`/api/admin/updateEmployee/${selectedEmployee._id}`, selectedEmployee);
      console.log("API Response:", response.data);

      if (response.data.success) {
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp._id === selectedEmployee._id ? { ...emp, ...selectedEmployee } : emp
          )
        );
        alert("Employee updated successfully!");
        setShowEditModal(false);
      }
    } 
    catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredEmployees.length / employeesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
        <h2 style={{ margin: 0, color: "#333", fontWeight: "bold" }}>Employees List</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <InputGroup style={{ maxWidth: "300px", marginRight: "10px" }}>
            <FormControl
              placeholder="Search Employees"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <InputGroup.Text>
              <i className="bi bi-search"></i>
            </InputGroup.Text>
          </InputGroup>
          <Button
            style={{ backgroundColor: "#007BFF", border: "none", whiteSpace: "nowrap", borderRadius: "8px", color: "#fff", fontWeight: "bold", transition: "background-color 0.3s ease" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
            onClick={() => navigate("/admin/createemployee")}
          >
            Add New Employee
          </Button>
        </div>
      </div>

      {currentEmployees.length > 0 ? (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            style={{
              backgroundColor: "#fff",
              color: "#333",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <thead
              style={{
                backgroundColor: "#007BFF",
                color: "#fff",
              }}
            >
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Designation</th>
                <th style={{ width: "120px" }}>Password</th>
                <th style={{ width: "20px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee, index) => (
                <tr key={index}>
                  <td>{indexOfFirstEmployee + index + 1}</td>
                  <td>{employee.employeeName}</td>
                  <td>{employee.employeeEmail}</td>
                  <td>{employee.designation}</td>
                  <td style={{ maxWidth: "80px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {employee.employeePassword}
                  </td>
                  <td>
                    <div className='d-flex'>
                      <Button variant="" style={{ color: "#007BFF" }} className="me-2" onClick={() => handleEdit(employee)}>
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button variant="" onClick={() => handleDelete(employee._id)} style={{ color: "red" }}>
                        <i className="bi bi-trash-fill"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="primary"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <i className="bi bi-arrow-left"></i>
            </Button>
            <Button
              variant="primary"
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)}
            >
              <i className="bi bi-arrow-right"></i>
            </Button>
          </div>
        </>
      ) : (
        <p style={{ color: "#333" }}>No employees added yet.</p>
      )}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <Form>
              <Form.Group controlId="formEmployeeName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
                  value={selectedEmployee.employeeName}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, employeeName: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formEmployeeEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={selectedEmployee.employeeEmail}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, employeeEmail: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formDesignation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter designation"
                  value={selectedEmployee.designation}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, designation: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={selectedEmployee.employeePassword}
                  onChange={(e) => setSelectedEmployee({ ...selectedEmployee, employeePassword: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EmployeeList;
