import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, Navigate } from 'react-router-dom';
import { query, where, collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { AuthContext } from '../../App';
import "./AvailableGroup.css"

const AvailableGroup = ({ group }) => {

    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isNotMember, setMember] = useState(false)

    useEffect(() => {
        async function getGroupMembers() {
            const memberRef = collection(db, "membership");
            const q = query(memberRef, where("group", "==", group.id));

            let memberIds = []

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach((doc) => {
                memberIds = [...memberIds, doc.data().member]
            });


            if (!memberIds.includes(currentUser.uid)) {
                setMember(true)
            }

        }

        getGroupMembers()
    })

    const joinGroup = async () => {

        let membershipData = {
            group: group.id,
            member: currentUser.uid
        }

        try {
            const docRef = await addDoc(collection(db, "membership"), membershipData);
            console.log("Membership assigned with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        const groupRef = doc(db, "groups", group.id);

        await updateDoc(groupRef, {
            members_remaining: group.members_remaining - 1
        });


        if (group.members_remaining - 1 == 0) {

            await updateDoc(groupRef, {
                has_space: false
            });

        }


        navigate(`/group/${group.id}`)


    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }


    return (
        <>
            {isNotMember ? (
                <div className='avail'>
                    <h1>{group.name}</h1>
                    <span>Total Members: {group.total_members}</span>
                    <span>Empty Spots: {group.members_remaining}</span>

                    <button className='newdatebtn camera j' onClick={joinGroup}> Join Group </button>
                </div>
            ) :
                <></>}
        </>
    )
}

export default AvailableGroup