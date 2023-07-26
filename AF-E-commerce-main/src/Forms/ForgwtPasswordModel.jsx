import React, { useState } from "react";
import { useUserAuth } from "../Utils/AuthContext";
import swal from "sweetalert";
import { useNavigate, useHis } from "react-router-dom";

const ForgotPasswordModel = ({setShowModal}) => {


    const [email , setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState('');
    const {resetPassword} = useUserAuth();

     const handleResetPassword = async (e) =>{
        e.preventDefault()
        try{
           await resetPassword(email)
           .then(() => {
               swal("passwrod email sent check your email")
               setShowModal(false)
             })
          
        }
          catch(err){
            console.log(err)
            setErrorMessage('User not found');
          }
     }
   

  return (
    <div className="container">
      <div id="forgetPasswordModal" class="modal">
        <div class="modal-content">
          <span class="close" id="closeModal" onClick={() => setShowModal(false)}>
            &times;
          </span>
          <h2>Forgot Password</h2>
          <span>
          <span style={{fontSize:"10px", marginBottom:"10px"}}>we will send you link to your email</span>
          </span>
          <form id="forgetPasswordForm">
           
            <label for="email">Email address:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
             {errorMessage && <span style={{fontSize:"10px"}}>{errorMessage}</span>}
            <button className="submit-button" onClick={handleResetPassword} type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModel;
