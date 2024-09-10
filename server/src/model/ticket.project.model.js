import {
  model,
  Schema,
} from 'mongoose';

const ticketSchema = new Schema({

    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    
    ticketName: {
        type: String,
        required: true,
    },

    ticketId: {
        type: String,
        required: true,
    },
    
    projectTeamLead: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },


    saptype:{
        type: String,
    },


    
    ticketDescription: {
        type: String,
        required: true,
    },

    ticketDocument: {
        type: String,
        required: true,
    },


    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
    },

    status: {
        type: String,
        enum: ["Open", "In Progress", "Closed"],
        default: "Open"
    },

    assignedTo: {
        type: String,
        enum: ["Team", "Employee"],
    },



    assignedByEmail: {
        type: String
    },

    assignedByName: {
        type: String
    },  

    

});
  
export const Ticket = model('Ticket', ticketSchema);    