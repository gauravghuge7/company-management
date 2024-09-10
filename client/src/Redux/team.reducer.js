
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

   team: [{

      teamName: "",
      teamId: "",
      teamLead: "",
      employee: [{
         employeeName: "",
         employeeEmail: ""
      }]

   }]

}



const teamSlice = createSlice({

   name: "team",
   initialState,

   reducers: {

      addTeam: (state, action) => {
         
         state.team = action.payload;
      }

   }

});


export const {addTeam} = teamSlice.actions;

export const teamReducer = teamSlice.reducer;


// other method for export 

// export default teamSlice.reducer;