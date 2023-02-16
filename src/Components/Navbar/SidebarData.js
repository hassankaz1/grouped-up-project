import React, { useCallback, useContext, useState } from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';




export const SidebarData = [
    {
        title: 'Find A Group',
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        path: `/`
    },
    {
        title: 'Create A group',
        icon: <AiIcons.AiOutlineForm />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        path: `/create-group`
    },
    {
        title: 'Groups',
        icon: <IoIcons.IoMdPeople />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Not In Any Team',
                icon: <IoIcons.IoIosPaper />
            }
        ]
    },
    {
        title: 'Signout',
        signout: true,
        icon: <IoIcons.IoIosLogOut />
    }
];

export const SidebarDataSignedOut = [
    {
        title: 'Sign In',
        signout: true,
        icon: <IoIcons.IoIosLogIn />,
        path: `/`
    }
];