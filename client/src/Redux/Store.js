import {combineReducers, configureStore } from '@reduxjs/toolkit';
import { employeeReducer } from './reducers';
import { teamReducer } from './team.reducer';
import { clientReducer } from './client.reducer';

const rootReducer = combineReducers({
    employeeReducer,
    teamReducer,
    clientReducer
})


export const store = configureStore({

    reducer: rootReducer,
})