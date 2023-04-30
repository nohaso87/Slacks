import React, { useState, useEffect } from "react";

// Firebase
import { auth, db, registerUserWithEmailAndPassword, storage } from "../Config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// Utility
import { Utility } from "../Utility";

// Theme
import {
  AuthWrapper,
  AuthLogo,
  AuthForm,
  AuthInput,
  AuthLink,
  AuthOption,
} from "./Style";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [exists, setExists] = useState(false);
  const [reTypePassword, setRetypePassword] = useState("");
  const [email, setEmail] = useState("");
  const utility = Utility();

  // Context
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
    }
    if (user) utility.goTo("/");
  }, [user, loading, utility]);

  const handleSignup = async (e) => {
    e.preventDefault();

      if (
        username !== "" &&
        password !== "" &&
        reTypePassword !== "" &&
        email !== ""
      ) {
        const userRef = collection(db, "users");
        const queryRef = query(userRef, where("username","==",utility.firstLetterUpper(username)));
        const count = await getCountFromServer(queryRef)
        let exist = count.data().count;
        
        if (exist < 1){
          if (password !== reTypePassword) {
            utility.notify("Passwords don't match");
          } else {

            registerUserWithEmailAndPassword(username, email, password)
              .then((userCredentials) => {
                utility.goTo("/");
              })
              .catch((error) => {
                if (error.message === "Firebase: Error (auth/invalid-email).") {
                  utility.notify("Invalid email");
                } else if (
                  error.message ===
                  "Firebase: Password should be at least 6 characters (auth/weak-password)."
                ) {
                  utility.notify(
                    "Weak password. Password should be at least 6 characters"
                  );
                } else if (
                  error.message === "Firebase: Error (auth/email-already-in-use)."
                ) {
                  utility.notify("User already exists");
                  utility.goTo("/Login");
                } else {
                  utility.notify("Unable to register");
                }
              });
          }
        }else{
          utility.notify("Username exists")
          setUsername("")
          setEmail("")
          setPassword("")
          setRetypePassword("")
        }
      } else {
        utility.notify("All fields are mandatory!");
      }     

  };


  const handleRedirect = () => {
    utility.goTo("/Login");
  };

  return (
    <>
      <AuthWrapper>
        <AuthLogo>SLACKX</AuthLogo>
        <AuthForm>
          <AuthInput
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={(e)=> setUsername(e.target.value)}
          />
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
          <AuthInput
            type="password"
            name="retypepassword"
            value={reTypePassword}
            placeholder="Re-type Password"
            onChange={(e) => setRetypePassword(e.target.value)}
          />

          <AuthInput type="submit" value="Signup" onClick={handleSignup} />
        </AuthForm>
        <AuthOption>
          Already a member?{" "}
          <AuthLink onClick={handleRedirect}>Login</AuthLink>{" "}
        </AuthOption>
      </AuthWrapper>
    </>
  );
};

export default Signup;
