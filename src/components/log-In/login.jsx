import "./login.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [LogInEmail, setLogInEmail] = useState("");
  const [LogInPassword, setLogInPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("Token");
    if (userToken) {
      navigate("/home");
    }
  }, [navigate]);

  function toggleSwitch() {
    setIsSignUp(!isSignUp);
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://todo-app-bbjk-nuj0rj5rb-muhammad-sufians-projects-e54cc3c2.vercel.app/login", {
        Email: LogInEmail,
        Password: LogInPassword,
      });

      const { user, token } = response.data;

      if (user && token) {
        localStorage.setItem("Token", token);

        const savedToken = localStorage.getItem("Token");

        const verifyResponse = await axios.post(
          "https://todo-app-bbjk-nuj0rj5rb-muhammad-sufians-projects-e54cc3c2.vercel.app/verifyToken",
          {
            Token: savedToken,
          }
        );

        const verifyToken = verifyResponse.data;

        if (verifyToken) {
          navigate("/home");
          toast.success("Log in sucessful", {
            className: "toast",
            autoClose: 5000,
          });
        } else {
          toast.error("Invalid Token", {
            className: "toast",
            autoClose: 5000,
          });
        }
      } else {
        toast.success("Invalid login response", {
          className: "toast",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("No such user exist", {
        className: "toast",
        autoClose: 5000,
      });
    }

    setLogInEmail("");
    setLogInPassword("");
  };

  function handleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }

  function LoginhandleChange(event) {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setLogInEmail(value);
        break;
      case "password":
        setLogInPassword(value);
        break;
      default:
        break;
    }
  }

  async function handleSignUp() {
    try {
      const newUser = {
        FirstName,
        LastName,
        Email,
        Password,
      };

      await axios.post("https://todo-app-bbjk-nuj0rj5rb-muhammad-sufians-projects-e54cc3c2.vercel.app/register", newUser);
      console.log("User saved:", newUser.FirstName);
      navigate("/home");
      toast.success("Sign in sucessful", {
        className: "toast",
        autoClose: 5000,
      });
    } catch (err) {
      toast.error("User already exists", {
        className: "toast",
        autoClose: 5000,
      });
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <div className="LoginMain">
        {!isSignUp ? (
          <div className="LogIN">
            <h1 className="Heading">Login</h1>
            <div className="InputFeildsDiv">
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="InputFeilds"
                onChange={LoginhandleChange}
                value={LogInEmail}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="InputFeilds"
                onChange={LoginhandleChange}
                value={LogInPassword}
              />
              <button
                className="BTN"
                onClick={handleLogin}
              >
                Log in
              </button>
            </div>
            <div className="AskingForAcc">
              <p>Don't have an account?</p>
              <button
                className="BTNCustom"
                onClick={toggleSwitch}
              >
                Sign up
              </button>
            </div>
          </div>
        ) : (
          <div className="SignUP">
            <h1 className="Heading">Sign UP</h1>
            <div className="InputFeildsDiv">
              <div className="Name">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="InputFeilds InputFeildsName"
                  onChange={handleChange}
                  value={FirstName}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="InputFeilds InputFeildsName"
                  onChange={handleChange}
                  value={LastName}
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="InputFeilds"
                onChange={handleChange}
                value={Email}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="InputFeilds"
                onChange={handleChange}
                value={Password}
              />
              <button
                className="BTN"
                onClick={handleSignUp}
              >
                Sign UP
              </button>
            </div>
            <div className="AskingForAcc">
              <p>Already have an account?</p>
              <button
                className="BTNCustom"
                onClick={toggleSwitch}
              >
                Log in
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
