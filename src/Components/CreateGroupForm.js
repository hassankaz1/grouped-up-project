import React, { useCallback, useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { AuthContext } from "../App";
import styled from 'styled-components';
import "./CreateGroupForm.css";

const Slider = styled.input.attrs({ type: 'range' })`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  width:100%;
  height: 12px;
  border-radius: 40px;
  background: ${(props) =>
        `linear-gradient(to right, #27296d 0%, #7c73e6 ${100 * (props.value - 2) / 4}%, #fff ${100 * (props.value - 2) / 4}%, #fff 100%);`};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    background-image: radial-gradient(circle, #f7f7fc 40%, #7c73e6 45%);
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
  }

  ::-moz-range-thumb {
    width: 24px;
    height: 24px;
    -moz-appearance: none;
    background-image: radial-gradient(circle, #f7f7fc 40%, #ff9800 45%);
    border-radius: 50%;
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.5);
  }
`;







const CreateGroupForm = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const [members, setMembers] = useState(4)

    const handleMembers = (e) => {
        setMembers(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let name = e.target.teamname.value


        const newGroupData = {
            hasSpace: true,
            total_members: members,
            members_remaining: members - 1,
            name
        }

        let newGroupId;


        try {
            const docRef = await addDoc(collection(db, "groups"), newGroupData);
            newGroupId = docRef.id
            console.log("New group created with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        let membershipData = {
            group: newGroupId,
            member: currentUser.uid
        }

        try {
            const docRef = await addDoc(collection(db, "membership"), membershipData);
            console.log("Membership assigned with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        e.target.reset();

        navigate(`/group/${newGroupId}`)

    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }


    return (
        <section className="teamform">



            <div className="teamContainer" >
                <h1>Create A New Group</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-input-box">
                        <input name="teamname" type="text" placeholder="Team Name" required />
                    </div>

                    <h2 className="mm">Max Members:</h2>
                    <h2 className="mm">{members}</h2>
                    <Slider min={2} max={6} value={members} onChange={handleMembers} />


                    <div className="btnContainer">
                        <button className="teambutton" type="submit">Create Team</button>
                    </div>

                </form>
            </div >

        </section >
    )
}

export default CreateGroupForm
