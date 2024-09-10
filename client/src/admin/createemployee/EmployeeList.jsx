import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";

// import jwt from 'jsonwebtoken'

// import { addEmployee } from "../../redux/reducers";
// import { message } from "react-message-popup";
// import axios from "axios";

const EmployeeList = ({ setValue }) => {


  const [employees, setEmployees] = useState([

    {
      id: 1,
      employeeName: "John Doe",
      employeeEmail: "johndoe@gmail.com",
      designation: "Software Engineer",
      employeePassword: "employeePassword123",
    },

    {   
      id: 2,      
      employeeName: "John Doe",
      employeeEmail: "johndoe@gmail.com",
      designation: "Software Engineer",
      employeePassword: "employeePassword123",
    },
    
  ]);


  // const dispatch = useDispatch();   // for sending data to redux

  const data = useSelector((state) => state.employeeReducer.employee);



  // const fetchEmployees = async() => {
  //   try {

  //     const response = await axios.get('/api/admin/totalEmployees');
      
  //     console.log("response => ", response);

  //     if(response.data.success === true) {
  //       setEmployees(response.data.data);
  //       message.success('Employees fetched successfully');
  //     }
    
  //   } 
  //   catch (error) {
  //     message.error(error.message);  
  //   }
  // }



  useEffect(() => {

    setEmployees(data);

  },[2]);


  return (
    <div
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h2 style={{ margin: 0, color: "#333" }}>Employees List</h2>
        <button
          style={{
            backgroundColor: "#4CAF50",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            color: "#fff",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#45a049")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#4CAF50")
          }
          onClick={() => setValue("createEmployee")}
        >
          Add New Employee
        </button>
      </div>

      {employees ? (
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
              <th scope="col">employeeEmail</th>
              <th scope="col">Designation</th>
              <th scope="col">employeePassword</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{employee.employeeName}</td>
                <td>{employee.employeeEmail}</td>
                <td>{employee.designation}</td>
                <td>{employee.employeePassword}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ color: "#333" }}>No employees added yet.</p>
      )}
    </div>
  );
};

export default EmployeeList;

