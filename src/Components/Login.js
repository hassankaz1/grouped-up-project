import React, { useCallback, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { AuthContext } from "../App";
import "./Login.css";

const Login = () => {

    const [hasAccount, setHasAccount] = useState(true);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        profilepic: ""
    });


    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");



    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };




    const handleLogin = async (e) => {
        e.preventDefault();

        setPasswordError("");
        setEmailError("");

        let email = formData.email
        let password = formData.password


        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode == "auth/invalid-password" || errorCode == "auth/wrong-password") {
                    setPasswordError(errorMessage)
                } else {
                    setEmailError(errorMessage)
                }
            });

    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        setPasswordError("");
        setEmailError("");


        let { email, password, username, profilepic } = formData;

        const userinfo = {
            username,
            password,
            email,
            profilepic
        }


        let uid;

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                uid = user.uid;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode == "auth/invalid-password" || errorCode == "auth/wrong-password") {
                    setPasswordError(errorMessage)
                } else {
                    setEmailError(errorMessage)
                }
            });

        await setDoc(doc(db, "users", uid), userinfo)

    }

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to="/" />;
    }

    return (
        <section className="login">


            <div className="loginContainer" >

                <form>
                    <div className="input-box">
                        <input name="email" type="email" value={formData.email} onChange={handleChange} required />
                        <label> Email </label>
                        <p className="errorMsg">{emailError}</p>

                    </div>

                    <div className="input-box">
                        <input name="password" type="password" value={formData.password} onChange={handleChange} required />
                        <label> Password </label>
                        <p className="errorMsg">{passwordError}</p>

                    </div>



                    {(!hasAccount) && (
                        <>
                            <div className="input-box">
                                <input name="username" type="text" value={formData.username} onChange={handleChange} required />
                                <label for="username"> Username </label>
                            </div>

                            <div className="input-box">
                                <input name="profilepic" type="text" value={formData.profilepic} onChange={handleChange} required />
                                <label> Link to Profile Pic </label>
                            </div>
                        </>
                    )}


                    <div className="btnContainer">
                        {hasAccount ? (
                            <>
                                <button className="lbutton" type="submit" onClick={handleLogin}>Log In</button>
                                <p>Don't have an account ? <span onClick={() => setHasAccount(false)}>Sign Up</span></p>
                            </>
                        ) : (
                            <>
                                <button className="lbutton" type="submit" onClick={handleSignUp}>Sign Up</button>
                                <p>Have an account ? <span onClick={() => setHasAccount(true)}>Sign In</span></p>
                            </>
                        )
                        }
                    </div>



                </form>
            </div >

        </section >
    );
};

export default Login;