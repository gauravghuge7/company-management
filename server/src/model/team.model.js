import {
  model,
  Schema,
} from 'mongoose';

const teamSchema = new Schema( {

   teamName: {
      type: String,
      required: true,
   },

   admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin"
   },


   teamId: {
      type: String,
      required: true,
   },

   teamLead: {
      type: Schema.Types.ObjectId,   // bson type
      ref: "Employee"
   },


   projectId: [{
      type: String,

   }],

   project: [{
      type: Schema.Types.ObjectId,
      required: true,
   }],

   employee: [{
      type: Schema.Types.ObjectId,
      ref: "Employee"
   }],


}, {timestamps: true});


export const Team = model('Team', teamSchema);