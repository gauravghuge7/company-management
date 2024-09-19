import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EmployeeList = ({ setValue }) => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const employeesPerPage = 10;

  const data = useSelector((state) => state.employeeReducer.employee);

  useEffect(() => {
    setEmployees(data);
  }, [data]);

  const filteredEmployees = employees.filter((employee) =>
    employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

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
    <div
      style={{
        background: "#f0f4f8",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
        color: "#333",
        maxWidth: "100%",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
          
        }}
      >
        <h2 style={{ margin: 0, color: "#333" }}>Employees List</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search Employees"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: "10px"  ,    maxWidth: "50%"}}
          />
          <button
            style={{
              backgroundColor: "#007BFF",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
            onClick={() => setValue("createEmployee")}
          >
            Add New Employee
          </button>
        </div>
      </div>

      {currentEmployees.length > 0 ? (
        <>
          <table
            className="table table-bordered"
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
                <th scope="col">#</th>
                <th scope="col">Full Name</th>
                <th scope="col">EmployeeEmail</th>
                <th scope="col">Designation</th>
                <th scope="col">EmployeePassword</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee, index) => (
                <tr key={index}>
                  <th scope="row">{indexOfFirstEmployee + index + 1}</th>
                  <td>{employee.employeeName}</td>
                  <td>{employee.employeeEmail}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.employeePassword}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              style={{
                backgroundColor: "#007BFF",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: "bold",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
              }}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === Math.ceil(filteredEmployees.length / employeesPerPage)}
              style={{
                backgroundColor: "#007BFF",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                color: "#fff",
                fontWeight: "bold",
                cursor: currentPage === Math.ceil(filteredEmployees.length / employeesPerPage) ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p style={{ color: "#333" }}>No employees added yet.</p>
      )}
    </div>
  );
};

export default EmployeeList;
