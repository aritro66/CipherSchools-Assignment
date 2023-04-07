import { useEffect, useState, useCallback } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import ProfileInfo from "./pages/ProfileInfo";
import Followers from "./pages/Followers";
import { UserContext } from "./contexts/usercontext";
import SignUpIn from "./pages/Auth/loginsignup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const inintialState = {
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
    facebooklink: "",
    interests: [],
  };
  const [userDetails, setUserDetails] = useState({ ...inintialState });

  const login = useCallback((data) => {
    localStorage.setItem("profile", JSON.stringify(data));
    setIsLoggedIn(true);
    setUserDetails((prev) => ({ ...prev, ...data }));
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserDetails(inintialState);
    localStorage.removeItem("profile");
  }, []);

  const update = useCallback((data) => {
    const oldData = JSON.parse(localStorage.getItem("profile"));
    setUserDetails((prev) => ({ ...prev, ...data }));
    localStorage.setItem("profile", JSON.stringify({ ...oldData, ...data }));
  }, []);

  useEffect(() => {
    if (localStorage.hasOwnProperty("profile")) {
      setIsLoggedIn(true);
      setUserDetails(JSON.parse(localStorage.getItem("profile")));
    }
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          isLoggedIn,
          login,
          logout,
          update,
          ...userDetails,
        }}
      >
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" />} />
            <Route
              path="/account"
              element={!isLoggedIn ? <SignUpIn /> : <Navigate to="/profile" />}
            />
            <Route
              path="/profile"
              element={
                isLoggedIn ? <ProfileInfo /> : <Navigate to="/account" />
              }
            />
            <Route
              path="/followers"
              element={isLoggedIn ? <Followers /> : <Navigate to="/account" />}
            />
          </Routes>
        </Layout>
      </UserContext.Provider>
    </>
  );
}

export default App;
