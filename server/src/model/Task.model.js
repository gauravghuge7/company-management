import {Schema, model} from 'mongoose';

const taskSchema = new Schema({

   project: {
      type: Schema.Types.ObjectId,
      ref: "Project"
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


   taskDocument: {
      type: String,
   },

   teamLead: {
      type: Schema.Types.ObjectId,  
      ref: "Team"
   },

   taskName: {
      type: String,
   
   },

   status: {
      type: String,
      enum: ["Started", "assigned", "pending", "Completed", "Cancelled"],
   },

   priority: {
      type: String,
      
   },


   assignBy: {
      type: Schema.Types.ObjectId,
      ref: "Team"
   },

   currentWork: {
      type: String,
   },

   ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket"
   }



});

export const Task = model('Task', taskSchema);