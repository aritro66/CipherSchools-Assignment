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
  aboutme: { type: String, default: "" },
  linkedinlink: { type: String, default: "" },
  githublink: { type: String, default: "" },
  facebooklink: { type: String, default: "" },
  twitterlink: { type: String, default: "" },
  instagramlink: { type: String, default: "" },
  websitelink: { type: String, default: "" },
});
// creating model
const usercreater = new mongoose.model("users", userSchema);

module.exports = usercreater;
