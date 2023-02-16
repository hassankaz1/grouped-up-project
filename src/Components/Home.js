import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "../App";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import Sidebar from "./Navbar/Sidebar";
import CreateGroupForm from "./CreateGroupForm";
import FindGroup from "./FindGroup/FindGroup";




const Home = () => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return <FindGroup />
}

export default Home;