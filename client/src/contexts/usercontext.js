import { createContext } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  fname: "",
  lname: "",
  phno: "",
  email: "",
  aboutme: "",
  highesteducation: 0,
  currentstatus: 0,
  githublink: "",
  instagramlink: "",
  linkedinlink: "",
  twitterlink: "",
  websitelink: "",
  interests: [],
  login: () => {},
  logout: () => {},
});
