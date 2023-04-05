const mongoose = require("mongoose");
// defining schema
const userSchema = new mongoose.Schema({
  fname: { type: String, require: true },
  lname: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  phno: { type: String, require: false, default: "" },
  password: { type: String, require: true },
  followers: [{ type: String }],
  highesteducation: { type: Number, default: 0 },
  currentstatus: { type: Number, default: 0 },
  interests: [{ type: Number }],
});
// creating model
const usercreater = new mongoose.model("users", userSchema);

module.exports = usercreater;
