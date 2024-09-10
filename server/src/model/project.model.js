import {Schema, model} from 'mongoose';


const projectSchema = new Schema({

   clientEmail: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
   },

   admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
   },

   clientName: {
      type: String,
      required: true,
   },

   client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
   },

   projectId: {
      type: String,
      required: true,
   },


   spokePersonEmail: {
      type: String,
      required: true,
   },

   spokePersonName: {
      type: String,
      required: true,
   },


   spokePersonNumber: {
      type: Number,
      required: true,
   },


   changes: [{
      type: Schema.Types.ObjectId,
      ref: "Ticket"
   }],
 


   projectName: {
      type: String,
      required: true,
   },

   projectTeamLead: {
      type: Schema.Types.ObjectId,
      ref: "Team"
   },

   team: {
      type: Schema.Types.ObjectId,
      ref: "Team"
   },

   description: {
      type: String,
      required: true,
   },

   descriptionDocument: {
      type: String,
      required: true,
   },


}, {timestamps: true});


export const Project = model('Project', projectSchema);