import { Schema, model, mongoose } from "mongoose"// Erase if already required
import bcrypt from "bcrypt"
// Declare the Schema of the Mongo model
const userAdminSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    rank:{
        type:String,
        required:true,
       
    },
    subdivision:{
        type:String,
        required:true,
        
    },
    mobile:{
        type:Number,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

// Hash password before saving
userAdminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password during login
userAdminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


//Export the model

const Admins = mongoose.models.admin || model("admin",userAdminSchema)

export default Admins