import axios from "axios";
import { useEffect } from "react";
import { message } from "react-message-popup";
import { useDispatch } from "react-redux";
import { addEmployee } from "../reducers";
import { extractErrorMessage } from "../../Components/CustomError";



export const setEmployeeData = () => {

    const dispatch = useDispatch();

    // set the employees in redux
    const fetchEmployees = async() => {
        try {

            const response = await axios.get('/api/admin/totalEmployees');
            
            console.log("response => ", response);

            if(response.data.success === true) {
            // message.success('Employees fetched successfully');
            dispatch(addEmployee(response.data.data));
            }
        
        } 
        catch (error) {
            const err = error?.response?.data?.message;
            message.error(err);
            if(err === "unauthorized admin ") {
                window.location.href = "/employee/login";
            }
        }
        finally {
            console.log("finally => ");
        }
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    return true;
}