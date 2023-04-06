import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import ProfileInfo from "./pages/ProfileInfo";
import Followers from "./pages/Followers";
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/profile" element={<ProfileInfo />} />
          <Route path="/followers" element={<Followers />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
