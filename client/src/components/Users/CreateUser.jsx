import React, { useState } from "react";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
  });
  const [message, setMessage] = useState("");
  const [type, setType] = useState("default");

  let navigate = useNavigate();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    try {
      const resp = await axios({
        method: "post",
        baseURL: "http://localhost:5000",
        data: user,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp?.status === 201) {
        setMessage(resp?.data?.message);
        setType(resp?.data?.type?.toLowerCase());
        setTimeout(() => {
          navigate("/users");
        }, 1000);
      }
    } catch (error) {
      setMessage("This email is already in use");
      setType("danger");
      setTimeout(() => {
        setMessage("");
        setType("default");
      }, 3000);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center h-100vh flex-direction-column">
        {message && (
          <Alert variant={type}>
            <Alert.Heading>{message}</Alert.Heading>
          </Alert>
        )}
        <div className="user-card">
          <h3 className="text-center">Create User</h3>
          <div className="user-info">
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                 Full Name
                </label>
                <input
                  type="text"
                  className="form-control w-35"
                  id="username"
                  name="username"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control w-35"
                  id="email"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <Button
                  disabled={!user?.email || !user?.username}
                  onClick={handleFormSubmit}
                  className="primary-btn w-35"
                >
                  Create
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
