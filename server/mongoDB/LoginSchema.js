import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  LastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("Users", UserSchema);

export default UserModel;
