import { createSlice } from "@reduxjs/toolkit";


const initialState = {

      employee: [{
            id: 0,
            firstName: "",
            lastName: "",
            email: "",
            designation: ""
            
      }],


      employeeDetails: {
            id: 0,
            firstName: "",
            lastName: "",
            email: "",
            designation: "",
            projects: [{
                  projectName: "",
                  description: "",
                  spokePersonName: "",
                  spokePersonEmail: "",
                  spokePersonNumber: "",
                  teamLead: "",
                  team: [{
                        teamName: "",
                        teamLead: "",
                        employee: [{
                              id: 0,
                              firstName: "",
                              lastName: "",
                              email: "",
                              designation: "",
                        }]
                  }]
            }],
            tasks: [{
                  id: 0,
                  taskName: "",
                  description: "",
                  date: "",
                  time: "",
                  status: "",
                  assignedTo: "",
                  projectId: "",
            }]
      }

      

}


const employeeSlice = createSlice({

      name: "data",
      initialState,
      reducers: {

            addEmployee: (state, action ) => {
                  state.employee = action.payload;
            },

            addEmployeeDetails: (state, action ) => {
                  state.employeeDetails = action.payload;
            }
            
      }

})

// const clientSlice = createSlice({

//       name: "data",
// })





export const {addEmployee } = employeeSlice.actions

export const employeeReducer = employeeSlice.reducer



