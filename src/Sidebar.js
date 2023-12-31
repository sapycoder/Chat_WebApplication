import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { SearchOutlined } from '@material-ui/icons';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChat from './SidebarChat';
import db from './firebase';
import './SidebarChat'
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [Rooms, setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('Rooms').onSnapshot((snapshot) =>
        (
            setRooms(snapshot.docs.map((doc) =>
            ({
                id: doc.id,
                data: doc.data(),
            })))
        ));

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar className="myicon" src={user?.photoURL} />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <IconButton >
                        <SearchOutlined />
                    </IconButton>
                    <input placeholder="Search or Start New Chat" type="text" />
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat />
                {Rooms.map((room) => (
                    <SidebarChat
                        key={room.id}
                        id={room.id}
                        name={room.data.name}
                    />
                ))}
            </div>


        </div>
    );
}

export default Sidebar
