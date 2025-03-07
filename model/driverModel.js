import mongoose from "mongoose";

import bcrypt from "bcrypt"

const DriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],

    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  vehicleDetails: {
    make: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    plateNumber: {
      type: String,
      required: true,
      unique: true
    },
    color: {
      type: String,
      required: true
    },
    insuranceNumber: {
      type: String,
      required: true,
      unique: true
    }
  },




  location: {
    latitude: {
      type: Number,
      default: 0
    },
    longitude: {
      type: Number,
      default: 0
    }
  },
  status: {
    type: String,
    enum: ["available", "on-trip", "offline"],
    default: "offline"
  },
  rating: {
    type: Number,
    default: 0
  },
  tripCount: {
    type: Number,
    default: 0
  },
 
  profilePicture: {
    type: String,
    default: ""
  },
 
});



DriverSchema.pre("save",async(next)=>{
  if(!this.isModified("password")) return next()
try {
  const salt = await bcrypt.salt(10);
  this.password =await bcrypt.hash(this.password,salt);
  next()
} catch (error) {
  next(error);
}
})

const Driver = mongoose.model("driver", DriverSchema);

export default Driver;
