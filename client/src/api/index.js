import axios from "axios";
import jwt_decode from "jwt-decode";

const API = axios.create({ baseURL: "http://localhost:5001/api/" });
const refreshToken = async () => {
  try {
    const res = await axios.post("http://localhost:5001/api/auth/refresh", {
      token: JSON.parse(localStorage.getItem("profile")).refreshToken,
    });
    console.log(res);
    return {
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    };
  } catch (err) {
    console.log(err);
  }
};

API.interceptors.request.use(async (req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).accessToken
    }`;
    const currentDate = new Date();
    const decodedToken = jwt_decode(
      JSON.parse(localStorage.getItem("profile")).accessToken
    );
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();
      req.headers["authorization"] = "Bearer " + data.accessToken;
      const newData = JSON.parse(localStorage.getItem("profile"));
      newData.accessToken = data.accessToken;
      newData.refreshToken = data.refreshToken;
      localStorage.setItem("profile", JSON.stringify({ ...newData }));
    } else return req;
  }
  return req;
});

export const LogIn = (formData) => API.post("/auth/login", formData);
export const SignUp = (formData) => API.post("/auth/signup", formData);
export const UpdateUser = (formData, email) =>
  API.put(`/user/updateuser?email=${email}`, formData);
export const ChangePassword = (formData) =>
  API.put("/auth/changepassword", formData);
