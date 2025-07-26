import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { ToastContainer, toast } from "react-toastify";
import LeftSidebar from "./components/LeftSidebar";
import UserChatRoom from "./components/UserChatRoom";
import GroupRightSideBar from "./components/GroupRightSideBar";
import UserRightSideBar from "./components/UserRightSideBar";

const App = () => {
  return (
    <div>
      <ToastContainer />
      {/* <Navbar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <div className="flex ">
              <LeftSidebar />
              <UserChatRoom />
              {/* <GroupRightSideBar/>  */}
              <UserRightSideBar />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
