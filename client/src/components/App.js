import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllUsers from "./Users/AllUsers";
import User from "./Users/User";
import CreateUser from "./Users/CreateUser";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CreateUser />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="*" element={<PageNotFound />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
