import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData, SidebarDataSignedOut } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { AuthContext } from '../../App';
import { auth, db } from "../../firebase";
import { add } from 'date-fns';
import * as IoIcons from 'react-icons/io';



const Nav = styled.div`
  background: white;
  height: 70px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: white;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const heading = styled.h1`
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    float: none;
    position: absolute;

`;



const Sidebar = () => {
    const { currentUser } = useContext(AuthContext);
    const [sidebar, setSidebar] = useState(false);
    const [groupids, setGroupIds] = useState([])

    const showSidebar = () => setSidebar(!sidebar);


    useEffect(() => {



        async function getUserGroups() {

            if (!currentUser) {
                setGroupIds([])
            } else {




                const memberRef = collection(db, "membership");
                const q = query(memberRef, where("member", "==", currentUser.uid));

                const querySnapshot = await getDocs(q);

                const ids = new Set();
                querySnapshot.forEach((doc) => {
                    ids.add(doc.data().group)

                });

                setGroupIds([...ids])
                // console.log(groupids)
            }
        }


        getUserGroups()

    }, [sidebar])

    useEffect(() => {

        async function getGroupInfo(groupid) {

            const groupRef = doc(db, "groups", groupid);
            const docSnap = await getDoc(groupRef);


            if (docSnap.exists()) {
                const groupData = docSnap.data();
                const navInfo = {
                    path: `/group/${docSnap.id}`,
                    title: groupData.name,
                    icon: <IoIcons.IoMdPeople />
                }

                return navInfo

            } else {
                console.log("No such document!");
            }
        }

        async function repeat() {
            const subNav = []
            for (let i = 0; i < groupids.length; i++) {
                let subNavInfo = await getGroupInfo(groupids[i])
                subNav.push(subNavInfo)
            }

            SidebarData[2].subNav = subNav

        }
        repeat();

    }, [groupids, sidebar])

    // if (!currentUser) {
    //     SidebarData = SidebarDataSignedOut
    // }



    return (
        <>
            <IconContext.Provider value={{ color: 'black' }}>
                <Nav>
                    <NavIcon to='#'>
                        <FaIcons.FaBars onClick={showSidebar} />

                    </NavIcon>
                    <h2 className='navhead'><FaIcons.FaHandPeace /> Grouped Up</h2>

                </Nav>
                <SidebarNav sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to='#'>
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {currentUser && SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}

                        {!currentUser && SidebarDataSignedOut.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar;