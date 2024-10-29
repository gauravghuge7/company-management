import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  model,
  Schema,
} from 'mongoose';

const adminSchema = new Schema({

   adminEmail: {
      type: String,
      required: true,
   },

   adminPassword: {
      type: String,
      required: true,
   },
   
   adminPasswordToken: {
      type: String,
   },

   adminName: {
      type: String,
      required: true,
   },

   adminRefreshToken: {
      type: String,

   },

   employees: [{
      type: Schema.Types.ObjectId,
      ref: "Employee"
   }],

   clients: [{
      type: Schema.Types.ObjectId,
      ref: "Client"
   }],

   teams: [{
      type: Schema.Types.ObjectId,
      ref: "Team"
   }],

   projects: [{
      type: Schema.Types.ObjectId,
      ref: "Project"
   }],


   userType: {
      type: String,
      enum:  ["admin", "client", "Employee"],

      default: "admin"
   }

}, {timestamps: true});




adminSchema.methods = {

   generateAdminAccessToken: function() {

      return jwt.sign(
         {
            _id: this._id,
            adminEmail: this.adminEmail,
         },
         process.env.ADMIN_ACCESS_SECRET_KEY,      //   need to be changed the every time

         {
            expiresIn: '24h'
         }
      
      )

   },

   generateAdminRefreshToken: function() {

      return jwt.sign(
         
         {
            _id: this._id,
         },
         process.env.ADMIN_REFRESH_SECRET_KEY,     //   need to be changed the every time
      
         {
            expiresIn: '7d'
         }
      )
   },


}

adminSchema.pre('save', async function() {

   if(this.isModified('adminPassword')) {

      const passwordToken = await jwt.sign(

         {
            adminPassword: this.adminPassword
         },
         process.env.ADMIN_PASSWORD_TOKEN,
         {
            expiresIn: '1y'
         }

      )

      this.adminPasswordToken = passwordToken;

      this.adminPassword = await bcrypt.hash(this.adminPassword, 10)
   }
})






















export const Admin = model('Admin', adminSchema);