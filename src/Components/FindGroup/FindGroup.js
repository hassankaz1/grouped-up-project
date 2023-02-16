import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import AvailableGroup from '../AvailableGroup/AvailableGroup';
import AvailableGroupList from '../AvailableGroupList/AvailableGroupList';
import "./FindGroup.css"

const FindGroup = () => {

    const [grps, setGrps] = useState([])

    useEffect(() => {

        async function getAvailableGroups() {
            const querySnapshot = await getDocs(collection(db, "groups"));
            let groupsFound = []


            querySnapshot.forEach((doc) => {
                let grpData = doc.data()
                grpData['id'] = doc.id

                groupsFound = [...groupsFound, grpData]

                // console.log(grpData)

                // if (grpData.has_space) {
                //     setGrps(...grps, grpData)
                // }
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });

            setGrps(groupsFound)

        }

        getAvailableGroups()

    }, [])

    return (
        <div className='group-container'>
            <section className='group-header'>
                <h1>Groups Available to Join</h1>
            </section>
            <div className='group-list'>
                {grps.length > 0 ? (<AvailableGroupList groups={grps} />) : <></>}
            </div>
        </div>
    )
}

export default FindGroup