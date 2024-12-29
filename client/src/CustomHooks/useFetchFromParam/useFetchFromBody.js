import axios from "axios";
import { useEffect, useState } from "react";



export const useFetchFromBody = (url) => {

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchData = async () => {

        try {
            const response = await axios.get(url);

            console.log("response => ", response);  

            const data  = response.data.data;

            setData(data);
        } 
        catch (error) {
            console.log(error);
            setError(error);
        }
        finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        fetchData();
    }, []);

        
    
    return {
        data,
        loading,
        error
    }

}