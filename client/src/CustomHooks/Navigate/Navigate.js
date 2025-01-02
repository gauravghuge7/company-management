
import { useNavigate } from "react-router-dom";

const useNavigateCustom = () => {


   const navigate = useNavigate();

   const goBack = () => {
      navigate(-1);
   }

   const goForward = () => {
      navigate(1);
   }

   const goToPath = (path) => {
      navigate(path);
   }

   return { 
      goBack, 
      goForward, 
      goToPath 
   };

}




export default useNavigateCustom;