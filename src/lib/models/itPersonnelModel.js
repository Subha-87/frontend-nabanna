//const { Schema, model, default: mongoose } = require("mongoose"); // Erase if already required
import { Schema, model, mongoose } from "mongoose"
import bcrypt from "bcrypt"
// Declare the Schema of the Mongo model
var itUserSchema = new Schema({
  name: {
    type: String,
    required: true,
   
    index: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim:true
  },
  password: {
    type: String,
    required: true,
    
  },
  rank: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
});

// Automatically hash password before saving //
itUserSchema.pre("save",async() => {
  if(!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})

// Compare password during login

itUserSchema.methods.comparePassword = async(enterPassword) => {
  return await bcrypt.compare(enterPassword,this.password)
}

//Export the model

const ItPerson = mongoose.models.it_person || model("it_person", itUserSchema);

module.exports = ItPerson;
