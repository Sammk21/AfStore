import GoogleButton from "react-google-button";

import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useUserAuth } from "../Utils/AuthContext";
import ForgotPasswordModel from "./ForgwtPasswordModel";
import swal from "sweetalert";
import { toast } from "react-toastify";
const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPssword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { logIn , googleSignIn, facebookSignIn } = useUserAuth();
  

  const navigate = useNavigate();


  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try{
       await googleSignIn();
       navigate("/")
       toast.success("your logged in successfully")
    }catch(err){
      setError(err.message);
    }
  }

  const handleFacebookLogin = async (e)=>{
    e.preventDefault()
    try{
      await facebookSignIn();
      navigate("/")
    }catch(err){
      setError(err.message)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    logIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        // dispatch({type:"LOGIN", payload:user})
        navigate("/");
        toast.success("you're sucessfully logged in")
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <>
      <div className="container">
        <div className="heading">
          <h1>Login</h1>
        </div>
        <div className="form-container">
          <div className="fill-details">
            <form onSubmit={handleLogin}>
              <label for="fname">Email</label>
              <input
                type="email"
                id="fname"
                name="firstname"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <label for="lname">password</label>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Enter your password"
                onChange={(e) => setPssword(e.target.value)}
              />

              <input type="submit" value="Submit"></input>
              {error && <span className="error">Wrong email and password</span>}
            </form>
            <div className="register-link">
              <div className="left">
                <span>Dont have an account?</span>
                <span
                  onClick={() => navigate("/register")}
                  className="register"
                >
                  Sign Up
                </span>
              </div>
              <div className="right">
                <span onClick={() => setShowModal(true)} className="d-flex justify-content-end register">
                  forget password?
                </span>
              </div>
            </div>

            <span className="d-flex justify-content-center">OR</span>
            <div className="social-Sign-in d-flex justify-content-center my-3">
              <GoogleButton onClick={handleGoogleSignIn} />
            </div>
            <div className="social-Sign-in d-flex justify-content-center my-3">
              <button onClick={handleFacebookLogin}>facebook</button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <ForgotPasswordModel setShowModal={setShowModal}/>}
    </>
  );
};

export default Login;
