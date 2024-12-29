import axios from "axios";
import { useEffect } from "react";
import { message } from "react-message-popup";
import { useDispatch } from "react-redux";
import { addClient } from "../client.reducer";



export const setClientData = () => {

    const dispatch = useDispatch();

    const fetchCompanies = async () => {
        try {
            
          const response = await axios.get("/api/admin/getAllClients")      // this is the api call we are using the axios 

            console.log("response.data => ", response.data.data);
        
            if(response.data.success === true) {
            message.success(response.data.message);
            dispatch(addClient(response.data.data));
            }
        
        } 
        catch (error) {
            message.error(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        fetchCompanies();
    }, []);

    return true;
}



