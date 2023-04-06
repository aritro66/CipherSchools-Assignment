import { useEffect, useState, useCallback } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import ProfileInfo from "./pages/ProfileInfo";
import Followers from "./pages/Followers";
import { UserContext } from "./contexts/usercontext";
import SignUpIn from "./pages/Auth/loginsignup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
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
  });
  const login = useCallback((data) => {
    localStorage.setItem("profile", JSON.stringify(data));
    setIsLoggedIn(true);
    setUserDetails(data);
    setuserId(localStorage.getItem("profile"));
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setuserId(null);
    localStorage.removeItem("profile");
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
