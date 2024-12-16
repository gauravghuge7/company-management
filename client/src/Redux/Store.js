import {combineReducers, configureStore } from '@reduxjs/toolkit';
import { employeeReducer } from "../../src/Redux/reducers";
import { teamReducer } from '../../src/Redux/team.reducer';
import { clientReducer } from '../../src/Redux/client.reducer';


const rootReducer = combineReducers({
    employeeReducer,
    teamReducer,
    clientReducer
})


export const store = configureStore({

    reducer: rootReducer,
})