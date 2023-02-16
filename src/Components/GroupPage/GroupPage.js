import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { doc, getDoc, collection, addDoc, query, where, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import "./GroupPage.css"
import DateCardList from '../DateCardList/DateCardList';
import CalendarView from '../Calendar/CalendarView';
import NewEventModal from '../NewEventModal/NewEventModal';
import * as AiIcons from 'react-icons/ai';
import * as TbIcons from 'react-icons/tb';


const GroupPage = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const { currentUser } = useContext(AuthContext);
    const [groupData, setGroupData] = useState(null)
    const [gid, setGid] = useState(id);
    const [modalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([])

    useEffect(() => {
        async function getGroupEvents() {
            const eventsRef = collection(db, "events");
            const q = query(eventsRef, where("group", "==", id));

            const querySnapshot = await getDocs(q);

            const gevents = []
            querySnapshot.forEach((doc) => {
                gevents.push(doc.data())
            });
            setEvents(gevents)
        }

        getGroupEvents()
    }, [groupData, modalOpen])


    useEffect(() => {
        async function getGroupInfo() {

            const groupRef = doc(db, "groups", gid);
            const docSnap = await getDoc(groupRef);


            if (docSnap.exists()) {
                const gData = docSnap.data();
                setGroupData(gData);
            } else {
                console.log("No such document!");
            }
        }
        getGroupInfo()

    }, [])

    const leaveGroup = async (e) => {
        const membershipRef = collection(db, "membership");
        const q = query(membershipRef, where("member", "==", currentUser.uid), where("group", "==", gid));

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (d) => {
            // console.log(doc.id, " => ", doc.data());
            let deleted = d.id
            console.log(deleted)
            await deleteDoc(doc(db, "membership", deleted));
        });

        const groupRef = doc(db, "groups", gid);

        await updateDoc(groupRef, {
            members_remaining: groupData.members_remaining + 1
        });


        if (groupData.members_remaining + 1 == 1) {

            await updateDoc(groupRef, {
                has_space: true
            });

        }

        navigate("/");
    }

    const videoChat = () => {
        window.open(`http://localhost:3005/?id=${gid}&username=${currentUser.username}`);

    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }


    return (
        <>
            {groupData ?
                (<>
                    {modalOpen && <NewEventModal setOpenModal={setModalOpen} group={id} />}
                    <div className='group-container'>
                        <section className='group-header'>
                            <h1>{groupData.name}</h1>
                        </section>
                        <div className='date-btn'>
                            <button onClick={videoChat} className='newdatebtn camera'><AiIcons.AiFillVideoCamera /> Join Group Video Call </button>
                        </div>
                        <h1 className='date-heading'>Upcoming Events for {groupData.name}</h1>
                        <div className='date-container'>
                            {events.length > 0 ? (<DateCardList events={events} />) : (<h1>Currently No Events</h1>)}

                        </div>
                        <div className='date-btn'>
                            <button className='newdatebtn' onClick={() => { setModalOpen(true) }}>Create a New Event</button>
                        </div>
                        <div className='cal-view'>
                            <CalendarView events={events} />
                        </div>


                    </div>
                    <div className='date-btn'>
                        <button className='newdatebtn leave' onClick={leaveGroup}><TbIcons.TbDoorExit /> Leave Group </button>
                    </div>

                </>
                ) :
                (<div>Loading</div>)}

        </>
    )
}

export default GroupPage