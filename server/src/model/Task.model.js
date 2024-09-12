import {Schema, model} from 'mongoose';

const taskSchema = new Schema({

   project: {
      type: Schema.Types.ObjectId,
      ref: "Project"
   },

   employeeEmail: {
      type: String,
      required: true,
   },

   employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee"
   },

   previousEmployee: [{
      type: Schema.Types.ObjectId,
      ref: "Employee"
   }],


   description: {
      type: String,
      required: true,
   },

   clientName: {
      type: String,
      required: true,
   },

   teamLead: {
      type: Schema.Types.ObjectId,  
      ref: "Team"
   },


   assignBy: {
      type: Schema.Types.ObjectId,
      ref: "Team"
   },

   ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket"
   }



});

export const Task = model('Task', taskSchema);