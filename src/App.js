import './App.css';
import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Home from './Components/Home'
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase.js";
import Sidebar from './Components/Navbar/Sidebar';
import CreateGroupForm from './Components/CreateGroupForm';
import GroupPage from './Components/GroupPage/GroupPage';
import { doc, getDoc, collection, addDoc, query } from "firebase/firestore";



export const AuthContext = createContext(null);

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
        console.log(user)

      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  useEffect(() => {

    async function getUserInfo() {
      const userRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(userRef);


      if (docSnap.exists()) {
        const user = docSnap.data();
        user["uid"] = currentUser.uid
        setCurrentUser(user)
      } else {
        console.log("No such document!");
      }

    }


    if (currentUser) {
      getUserInfo()
    }
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/create-group' element={<CreateGroupForm />}></Route>
        <Route path='/group/:id' element={<GroupPage />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
