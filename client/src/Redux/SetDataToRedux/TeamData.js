
import axios from "axios";
import { useEffect } from "react";
import { message } from "react-message-popup";
import { useDispatch } from "react-redux";
import { addTeam } from "../team.reducer";


export const setTeamData = () => {

    const dispatch = useDispatch();

    const fetchTeams = async () => {
        try {
            
            const response = await axios.get("/api/admin/getAllTeams")      // this is the api call we are using the axios 

            console.log("response.data => ", response.data.data);
        
            if(response.data.success === true) {
                message.success(response.data.message);
                dispatch(addTeam(response.data.data.team));
            }
        
        } 
        catch (error) {
            message.error(error?.response?.data?.message);
        }
    }
    
    // set the teams in the redux
    useEffect(() => {
        fetchTeams();
    }, []);

    return true;
}