import { createSlice } from "@reduxjs/toolkit";

const initialState = {

   client: [{
      clientName: "",
      clientEmail: "",
      clientPassword: "",
      admin: ""
   }],

   clientDetails: {
      id: 0,
      clientName: "",
      clientEmail: "",
      clientPassword: "",
      admin: ""
   }

}

const clientSlice = createSlice({

   name: "client",
   initialState,

   reducers: {

      addClient: (state, action) => {
         
         state.client = action.payload;
      },
      addClientDetails: (state, action) => {
         
         state.clientDetails = action.payload;
      }

   }
})


export const {addClient} = clientSlice.actions;

export const clientReducer = clientSlice.reducer;

// other method for export 

// export default clientSlice.reducer;