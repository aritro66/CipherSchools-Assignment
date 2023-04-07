import React, { useState, useContext } from "react";
import styles from "./loginsignup.module.css";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/usercontext";
import { LogIn, SignUp } from "../../api";

export default function SignUpIn() {
  const [rightPanel, setRightPanel] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    lname: "",
    fname: "",
  });
  const navigate = useNavigate();
  //   const { setValue, removeValue } = useLocalStorage();
  const auth = useContext(UserContext);
  console.log(auth);
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = loginForm.email;
    const password = loginForm.password;

    if (email.trim().length === 0) {
      alert("Email cannot be empty");
      return;
    }

    await LogIn({ email, password })
      .then((res) => {
        if (res.status === 400) {
          throw new Error("Failed!");
        }
        return res.data;
      })
      .then((resData) => {
        console.log(resData);
        auth.login(resData);
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const fname = signupForm.fname;
    const lname = signupForm.lname;
    const email = signupForm.email;
    const password = signupForm.password;

    if (
      fname.trim().length === 0 ||
      lname.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0
    ) {
      alert("Please fill all the fields");
      return;
    }

    SignUp({ fname, lanme, email, password })
      .then((res) => {
        if (res.status === 400) {
          throw new Error("Failed!");
        }
        return res.data;
      })
      .then((resData) => {
        console.log(resData);
        auth.login(resData);
        // navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id={styles["cont"]}>
      <div
        className={`${styles["container"]} ${
          rightPanel ? styles["right-panel-active"] : ""
        }`}
        id={styles["container"]}
      >
        <div
          className={`${styles["form-container"]} ${styles["sign-up-container"]}`}
        >
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              onChange={(e) => {
                setSignupForm({
                  ...signupForm,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              onChange={(e) => {
                setSignupForm({
                  ...signupForm,
                  [e.target.name]: e.target.value,
                });
              }}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setSignupForm({
                  ...signupForm,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setSignupForm({
                  ...signupForm,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div
          className={`${styles["form-container"]} ${styles["sign-in-container"]}`}
        >
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
              }}
            />
            {/* <a href="#">Forgot your password?</a> */}
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className={styles["overlay-container"]}>
          <div className={styles["overlay"]}>
            <div
              className={`${styles["overlay-panel"]} ${styles["overlay-left"]}`}
            >
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className={styles["ghost"]}
                id={styles["signIn"]}
                onClick={() => {
                  setRightPanel(false);
                }}
              >
                Sign In
              </button>
            </div>
            <div
              className={`${styles["overlay-panel"]} ${styles["overlay-right"]}`}
            >
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className={styles["ghost"]}
                id={styles["signUp"]}
                onClick={() => {
                  setRightPanel(true);
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
