import React, { useState, useEffect } from "react";

// Utility
import { Utility } from "../Utility/index.js";

// firebase
import { auth, db, loginUserWithEmailAndPassword } from '../Config/Firebase.js'
import { useAuthState } from "react-firebase-hooks/auth";

// Theme
import {
  AuthWrapper,
  AuthLogo,
  AuthForm,
  AuthInput,
  AuthLink,
  AuthOption,
} from "./Style.js";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const utility = Utility();

  useEffect(() => {
    if (loading) {
    }else if (user) utility.goTo("/");
  }, [user, loading, utility])

  const handleLogin = (e) => {
    e.preventDefault();
    e.target.disabled = true
    e.target.value = "..."

    if (email && password) {
      loginUserWithEmailAndPassword(email, password)
        .then(async (userCredentials) => {
          e.target.disabled = false
          e.target.value = "Login"
          const collectionRef = collection(db, "users")
          const queryRef = query(collectionRef, where("email","==",email.toLowerCase()))
          const userDoc = await getDocs(queryRef)
          const docRef = doc(db, "users",userDoc.docs[0].id)
            await updateDoc(docRef, {
              active: 1
            })
        })
        .catch((error) => {
          if (error.message === "Firebase: Error (auth/invalid-email).") {
            utility.notify("Invalid email");
          } else if (
            error.message === "Firebase: Error (auth/user-not-found)."
          ) {
            utility.notify("User does not exist. Please register");
          } else {
            utility.notify("Incorrect Username/Password");
          }
        });
    } else {
      utility.notify("All fields are mandatory!");
      e.target.disabled = false
      e.target.value = "Login"
    }
  };

  return (
    <>
      <AuthWrapper>
        <AuthLogo>SLACKX</AuthLogo>
        <AuthForm>
          <AuthInput
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthInput type="submit" value="Login" onClick={handleLogin} />
        </AuthForm>
        <AuthOption>
          New to Slacks?{" "}
          <AuthLink onClick={() => utility.goTo("/Signup")}>
            Register
          </AuthLink>{" "}
        </AuthOption>
      </AuthWrapper>
    </>
  );
};

export default Login;
