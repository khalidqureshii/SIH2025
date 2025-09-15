import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const curr = this;
  if (!curr.isModified("password")) {
    next();
  }
  curr.password = await hashPassword(curr.password);
});

userSchema.methods.checkPassword = async function (enteredPass) {
  const isCorrect = bcrypt.compareSync(enteredPass, this.password);
  return isCorrect;
};

userSchema.methods.generateToken = async function () {
  try {
    return await jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_GENERATING_STRING,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

async function hashPassword(input_password) {
  try {
    const saltRounds = await bcrypt.genSalt(10);
    return await bcrypt.hash(input_password, saltRounds);
  } catch (error) {
    next(error);
  }
}

const User = mongoose.model("User", userSchema);
export default User;
