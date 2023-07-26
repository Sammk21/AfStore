import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  FacebookAuthProvider,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase";
import swal from "sweetalert";

const AuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            swal("account created sucessfully check your email to verify")
          })



        swal("user created sucessfully")

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message
      })




  }
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function facebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider();
    facebookAuthProvider.addScope("user_birthday")
    return signInWithPopup(auth, facebookAuthProvider);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {

      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, facebookSignIn,resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(AuthContext);
}

// import React, { createContext ,useEffect, useState, useContext } from "react";
// import { auth } from "../firebase";
// import {
//     createUserWithEmailAndPassword,
//     onAuthStateChanged,
//     sendPasswordResetEmail,
//     signInWithEmailAndPassword,
//     signOut
// } from "firebase/auth";

// export const AuthContext = createContext();

// export function useAuth() {
//     return useContext(AuthContext)
// }

// export const AuthProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [pending, setPending] = useState(true);

//     function signup(email, password) {
//         return createUserWithEmailAndPassword(auth, email, password)
//     }

//     function login(email, password) {
//         return signInWithEmailAndPassword(auth, email, password)
//     }
//     function logout() {
//         return signOut()
//     }


//     function updateEmail(email) {
//         return currentUser.updateEmail(email)
//     }

//     function updatePassword(password) {
//         return currentUser.updatePassword(password)
//     }
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, user => {
//             setCurrentUser(user)
//             setPending(false)
//         });
//         return () =>{
//             unsubscribe();
//         }
//     }, []);

//     if (pending) {
//         return <>Loading...</>
//     }

//     const value = {
//         currentUser,
//         login,
//         signup,
//         logout,
//         resetPassword,
//         updateEmail,
//         updatePassword
//     }
//     return (
//         <AuthContext.Provider
//             value={value}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };
