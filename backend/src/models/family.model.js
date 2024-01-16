import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const familySchema = new Schema(
  {
    headOfFamily: {
      surname: { type: String, required: true },
      firstname: { type: String, required: true },
      secondname: { type: String, required: true },
      email: {
        type: String,
        required: true,
        unique: [true, "Email is already exits!"],
      },
      proffession: { type: String, required: true },
      contact: { type: String, required: true },
      education: { type: String },
      bloodGroup: { type: String },
      dob: { type: String },
      address: { type: String },
    },
    wifeDetails: {
      surname: { type: String, required: true },
      firstname: { type: String, required: true },
      secondname: { type: String, required: true },
      proffession: { type: String, required: true },
      contact: { type: String, required: true },
      education: { type: String },
      bloodGroup: { type: String },
      dob: { type: String },
      address: { type: String },
    },
    sonDetails: [
      {
        surname: { type: String },
        firstname: { type: String },
        secondname: { type: String },
        proffession: { type: String },
        contact: { type: String },
        education: { type: String },
        bloodGroup: { type: String },
        dob: { type: String },
        address: { type: String },
      },
    ],
    daughterDetails: [
      {
        surname: { type: String },
        firstname: { type: String },
        secondname: { type: String },
        proffession: { type: String },
        contact: { type: String },
        education: { type: String },
        bloodGroup: { type: String },
        dob: { type: String },
        address: { type: String },
      },
    ],
    password: { type: String, required: true },
    isAdmin: { type: String, default: false },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

familySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

familySchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

familySchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.headOfFamily.email,
      firstname: this.headOfFamily.firstname,
      surname: this.headOfFamily.surname,
      isAdmin: this.isAdmin,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
 
familySchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Family = mongoose.model("Family", familySchema);
