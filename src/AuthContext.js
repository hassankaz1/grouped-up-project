import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";

export const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    // const [pending, setPending] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                setCurrentUser(user)

            } else {
                setCurrentUser(null);
            }
        });
        // app.auth().onAuthStateChanged((user) => {

        // });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }} >
            {children}
        </AuthContext.Provider>
    );
};