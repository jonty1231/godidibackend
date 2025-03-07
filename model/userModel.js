import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      // required: [true, "Password is required"],
    },
    user_name: {
      type: String,
      required: [true, "Username is required"],
      
      unique: true,
      trim: true,
    },
    socialAuth: {
      provider: { type: String, enum: ["google", "facebook", "apple"], default: null },
      providerId: { type: String, unique: true, sparse: true },
    },
    status: {
      type: Boolean,
      default: true,
    },
    
  },
  { timestamps: true }
);
  
 userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); 
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
