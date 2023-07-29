import { SearchOutlined } from '@material-ui/icons';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import './Chat.css'
import db from './firebase';
import './SidebarChat'
import firebase from 'firebase'    //to avoid problem of different timestamp
import { useStateValue } from './StateProvider';

function Chat() {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db
                .collection('Rooms')
                .doc(roomId)
                .onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            })

            db
                .collection('Rooms')
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("you typed >>>", input)

        db
            .collection('Rooms')
            .doc(roomId)
            .collection('messages')
            .add
            ({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })

        setInput("");
    };

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p className='chat-room-last-seen'>
                        Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton >
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
            {messages.map(message => (
                    <p className={`chat_message ${ message.name == user.displayName && 'chat_receiver'}`}>
                        <span className="chat_name">{message.name}</span>
                        {message.message}
                    <span
                        className="chat_timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                ))}
            </div>

            <div className="chat_footer">
                <IconButton>
                    <EmojiEmotionsIcon />
                </IconButton>
                <form>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text"
                        placeholder="Type a message.." />
                    <button
                        onClick={sendMessage}
                        type="submit">Send the message</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
