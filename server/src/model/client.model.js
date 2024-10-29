import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const clientSchema = new Schema({

   clientName: {
      type: String,
      required: true,
   },

   admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin"
   },
   
   adminEmail : {
      type: String,
      required: true,
   },

   
   clientEmail: {
      type: String,
      required: true,
   },
   
   clientPassword: {
      type: String,
      required: true,
   },

   clientPasswordToken: {
      type: String,
   },
   
   userType: {
      type: String,
      enum:  ["Admin", "client", "Employee"],

      default: "client"
   }




}, {timestamps: true});


clientSchema.methods = {

   generateClientAccessToken: function() {

      return jwt.sign(
         {
            _id: this._id,
            clientEmail: this.clientEmail,
         },
         process.env.CLIENT_ACCESS_SECRET_KEY,      //need to be changed the very time 

         {
            expiresIn: '24h'
         }
      
      )

   },

   generateClientRefreshToken: function() {

      return jwt.sign(
         {
            _id: this._id,
            clientEmail: this.clientEmail,
            clientName: this.clientName,
            adminEmail: this.adminEmail,
         },
         process.env.CLIENT_REFRESH_SECRET_KEY,            //   nedd to be changed the every time 

      
         {
            expiresIn: '7d'
         }
      )
   },





}

clientSchema.pre('save', async function() {

   if(this.isModified('clientPassword')) {

      const passwordToken = await jwt.sign(

         {
            clientPassword: this.clientPassword
         },
         process.env.CLIENT_PASSWORD_TOKEN,
         {
            expiresIn: '1y'
         }

      )

      this.clientPasswordToken = passwordToken;

      this.clientPassword = await bcrypt.hash(this.clientPassword, 10)
   }
   
})




export const Client = model('Client', clientSchema);