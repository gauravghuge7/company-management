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


   projectId: {
      type: String,
      required: true,
   },

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


   description: {
      type: String,
   },

   assignBy: {
      type: Schema.Types.ObjectId,
      ref: "Team"
   }



});

export const Task = model('Task', taskSchema);