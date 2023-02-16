import React from "react";
import "./NewEventModal.css";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { auth, db } from "../../firebase";
import { collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";



const NewEventModal = ({ setOpenModal, group }) => {

    const handleLinkSubmit = async (e) => {
        e.preventDefault();
        let title = e.target.title.value;
        let description = e.target.description.value
        let link = e.target.link.value
        let start = e.target.start.value
        let end = e.target.end.value

        const formData = {
            title, description, start, end, group, link
        }

        try {
            const docRef = await addDoc(collection(db, "events"), formData);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        e.target.reset();
        setOpenModal(false);
    }



    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <h1>Create a new Event</h1>
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>


                <div class="formcontainer">
                    <form onSubmit={handleLinkSubmit}>
                        <div className="form-inputs">
                            <label>Title</label>
                            <input name="title" type="text" />
                        </div>

                        <div className="form-inputs">
                            <label>Description</label>
                            <textarea name="description" />
                        </div>

                        <div className="form-inputs">
                            <label>Link - optional</label>
                            <input name="link" type="text" />
                        </div>


                        <div>
                            <div className="pickdatelabel">
                                <label className="start-label">Start Date</label>
                                <label className="end-label">End Date</label>
                            </div>
                            <div>
                                <input className="pickdate" name="start" type="date" />
                                <input className="pickdate" name="end" type="date" />
                            </div>
                        </div>
                        <div>
                            <button className="newdatebtn eventbtn" type="submit">Submit</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default NewEventModal