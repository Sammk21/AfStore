import React, { useRef, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import "./Login.scss";
import { useUserAuth } from "../Utils/AuthContext";
import swal from "sweetalert";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, seterror] =  useState()
  const navigate = useNavigate();
  const { signUp } = useUserAuth();

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm();

  async function submitForm(data) {
    //console.log(data)
    try {
      setLoading(true);
      await signUp(data.email, data.password);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("User created failed");
      alert(error);
    }
    setLoading(false);
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>Register</h1>
      </div>
      <div className="form-container">
        <div className="fill-details">
          <form
            className=" w-[300px] flex flex-col gap-4 mt-6 "
            autoComplete="off"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className=" w-full flex flex-col gap-2 items-start ">
              <label htmlFor="email">email</label>
              <input
                type="email"
                id="email"
                className=" w-full p-2 "
                {...register("email", {
                  required: { value: true, message: "email must be fill!" },
                  pattern: {
                    value:
                      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/,
                    message: "email is not valid",
                  },
                })}
              />
              {errors?.email && (
                <small className="text-red"> {errors?.email.message} </small>
              )}
            </div>

            <div className=" w-full flex flex-col gap-2 items-start ">
              <label htmlFor="password">password</label>
              <div className=" relative w-full flex flex-col justify-center ">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className=" "
                  {...register("password", {
                    required: {
                      value: true,
                      message: "password must be fill!",
                    },
                    minLength: {
                      value: 6,
                      message: "min 6 character",
                    },
                    // pattern: {
                    //   value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    //   message:
                    //     " Minimum eight characters, at least one letter and one number ",
                    // },
                  })}
                />
                <AiOutlineEye
                  className=" absolute right-2 select-none cursor-pointer "
                  onClick={togglePassword}
                />
              </div>

              {errors?.password && (
                <small className="text-red"> {errors?.password.message} </small>
              )}
            </div>

            <div className=" w-full flex flex-col gap-2 items-start ">
              <label htmlFor="password2">repeat password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password2"
                className=" w-full p-2 "
                {...register("password2", {
                  validate: (val) => {
                    if (watch("password") !== val) {
                      return (errors.password2 = "password is not matched");
                    }
                  },
                })}
              />
              {errors?.password2 && (
                <small className="text-red">
                  {" "}
                  {errors?.password2.message}{" "}
                </small>
              )}
            </div>

            <div className=" w-full flex justify-end ">
              <button disabled ={loading}
                className=" w-[120px] bg-sky-500 text-white "
                type="submit"
              >
                register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;

//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

// const nameRef = useRef()
// const lastNameRef = useRef()
// const passwordRef = useRef()
// const passwordConfirmRef = useRef()
// const emailRef = useRef()

//   return (
//     <>
//        <>
//       <div className="container">
//         <div className="heading">
//           <h1>Register</h1>
//         </div>
//         <div className="form-container">
//           <div className="fill-details">
//             <form action="">
//             <label for="fname">Firstname</label>
//               <input
//                 type="text"
//                 ref={nameRef}
//                 id="fname"
//                 name="firstname"
//                 placeholder="Enter your firstname.."
//               />
//                 <label for="fname">Lastname</label>
//               <input
//                 type="text"
//                 id="fname"
//                 ref={lastNameRef}
//                 name="firstname"
//                 placeholder="Enter your lastname.."
//               />
//               <label for="fname">Email</label>
//               <input
//                 type="text"
//                 ref={emailRef}
//                 id="fname"
//                 name="firstname"
//                 placeholder="Enter your email.."
//               />

//               <label for="lname">password</label>
//               <input
//                 type="text"
//                 id="lname"
//                 ref={passwordRef}
//                 name="lastname"
//                 placeholder="Enter your password.."
//               />
//                <label for="lname">Confirm password</label>
//               <input
//                 type="text"
//                 id="lname"
//                 ref={passwordConfirmRef}
//                 name="lastname"
//                 placeholder="Enter your password again.."
//               />

//               <input type="submit" value="Sign Up" />
//             </form>
//             <div className="register-link">
//               <span>Already have an account?</span>
//               <Link to="/login" className="register">Log In</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//     </>
//   )
// }

// export default Register
