import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAuth, signOut } from "firebase/auth";
import { auth } from '../../firebase';

const SidebarLink = styled(Link)`
  display: flex;
  color: black;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: white;
    border-left: 4px solid #7c73e6;
    cursor: pointer;
    color: #7c73e6
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #c4c1e0;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  font-size: 18px;
  &:hover {
    background: #7c73e6;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    const handleSignOut = (e) => {

        e.preventDefault();

        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("signed out")
            return <Navigate to="/login" />;
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <>
            <SidebarLink to={item.path} onClick={item.signout ? handleSignOut : (item.subNav && showSubnav)}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                            ? item.iconClosed
                            : null}
                </div>
            </SidebarLink>
            {subnav &&
                item.subNav.map((item, index) => {
                    return (
                        <DropdownLink to={item.path} key={index} >
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </DropdownLink>
                    );
                })}
        </>
    );
};

export default SubMenu;