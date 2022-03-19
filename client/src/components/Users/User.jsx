import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";

function User() {
  const params = useParams();
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(user?.email);
  const [message, setMessage] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    getUserById();
  }, [params.id]);

  const getUserById = async () => {
    setLoading(true);
    const resp = await axios.get(`http://localhost:5000/${params.id}`);
    if (resp?.status === 200) {
      setLoading(false);
      setUser(resp?.data);
      setEmail(resp?.data?.email);
    }
  };

  const updateEmail = (e) => {
    setDisable(false);
    setEmail(e.target.value);
  };

  const updateUser = async () => {
    try {
      const resp = await axios({
        method: "patch",
        baseURL: `http://localhost:5000/${user?._id}`,
        data: { ...user, email },
      });
      if (resp.status === 200) {
        setMessage("User updated successfully");
        setTimeout(() => {
          navigate("/users");
        }, 1000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {message && (
        <Alert variant="success">
          <Alert.Heading>{message}</Alert.Heading>
        </Alert>
      )}
      {loading ? (
        <Spinner />
      ) : (
        <div className="d-flex justify-content-center align-items-center h-100vh flex-direction-column">
          <div className="user-card">
            <h1>Update User</h1>

            <div className="user-info">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control w-35"
                    id="username"
                    value={user?.username}
                    disabled
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
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
                <div className="mb-3">
                  <Button
                    disabled={disable}
                    onClick={updateUser}
                    className="primary-btn w-35"
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default User;
