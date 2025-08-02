import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const ChatContext = createContext();
import axios from "axios";
import { useEffect } from "react";
import { GetUserIdFromToken } from "../utils/GetUserIdFromToken";


export const ChatContextProvider = (props) => {
  const directMessages = [  
    {
      id: "64c1f67a4f9a9c0012d13e41",
      name: "Alex Johnson",
      lastMessage: "Hey, how are you?",
      unread: 2,
    },
    { id: "64c1f67a4f9a9c0012d13e42", name: "Sam Wilson", lastMessage: "Meeting at 3 PM", unread: 0 },
    { id: "64c1f67a4f9a9c0012d13e43", name: "Sam Wilson", lastMessage: "Meeting at 3 PM", unread: 0 },
    { id: "64c1f67a4f9a9c0012d13e44", name: "Sam Wilson", lastMessage: "Meeting at 3 PM", unread: 0 },
    { id: "64c1f67a4f9a9c0012d13e45", name: "Sam Wilson", lastMessage: "Meeting at 3 PM", unread: 0 },
    { id: "64c1f67a4f9a9c0012d13e46", name: "Sam Wilson", lastMessage: "Meeting at 3 PM", unread: 0 },
    { id: "64c1f67a4f9a9c0012d13e47", name: "Sam Wilson", lastMessage: "Meeting at 3 PM", unread: 0 },
    { id: "64c1f67a4f9a9c0012d13e48", name: "Sam Wilson", lastMessage: "Meeting at 3 PM", unread: 0 },
  ];

  const groupChats = [
    { id: "general", name: "General", members: 12, unread: 5 },
    { id: "random", name: "Random", members: 8, unread: 0 },
    { id: "random", name: "Random", members: 8, unread: 0 },
    { id: "rando", name: "Random", members: 8, unread: 0 },
    { id: "rand", name: "Random", members: 8, unread: 0 },
  ];

  const messages = [
    {
      id: 1,
      sender: "Alex Johnson",
      text: "Hey team! How's the project going?",
      time: "10:30 AM",
      isMe: false,
      read: true,
    },
    {
      id: 2,
      sender: "You",
      text: "Going well! Just finished the UI components.",
      time: "10:32 AM",
      isMe: true,
      read: true,
    },
    {
      id: 3,
      sender: "Alex Johnson",
      text: "Hey team! How's the project going?",
      time: "10:30 AM",
      isMe: false,
      read: true,
    },
    {
      id: 4,
      sender: "You",
      text: "Going well! Just finished the UI components.",
      time: "10:32 AM",
      isMe: true,
      read: true,
    },
    {
      id: 5,
      sender: "Alex Johnson",
      text: "Hey team! How's the project going?",
      time: "10:30 AM",
      isMe: false,
      read: true,
    },
    {
      id: 6,
      sender: "You",
      text: "Going well! Just finished the UI components.",
      time: "10:32 AM",
      isMe: true,
      read: true,
    },
    {
      id: 7,
      sender: "Alex Johnson",
      text: "Hey team! How's the project going?",
      time: "10:30 AM",
      isMe: false,
      read: true,
    },
    {
      id: 8,
      sender: "You",
      text: "Going well! Just finished the UI components.",
      time: "10:32 AM",
      isMe: true,
      read: true,
    },
    {
      id: 9,
      sender: "Alex Johnson",
      text: "Hey team! How's the project going?",
      time: "10:30 AM",
      isMe: false,
      read: true,
    },
    {
      id: 10,
      sender: "You",
      text: "Going well! Just finished the UI components.",
      time: "10:32 AM",
      isMe: true,
      read: true,
    },
  ];


  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const sharedMedia = [
    { id: 1, type: "image", preview: "photo1.jpg", date: "Today, 10:30 AM" },
    { id: 2, type: "file", name: "document.pdf", date: "Yesterday" },
  ];

  const [selectedChat, setSelectedChat] = useState(null); // stores full chat object
  const [chatMessages, setChatMessages] = useState([]); // stores messages for selected chat
  const [user, setUser] = useState([]);


   const fetchChatIfMissing = async () => {
    if (!selectedChat && someStoredChatId) {
      try {
        const { data } = await axios.get(`/api/chats/${someStoredChatId}`);
        setSelectedChat(data);
      } catch (err) {
        console.error("Failed to fetch chat", err);
      }
    }
  };


  // ----------------------------------api call for fetching user info----------------
const fetchUser = async () => {
  const currentUserId = GetUserIdFromToken();
  if (!currentUserId) {
    console.error("No user ID found in token.");
    return;
  }

  try {
    const res = await axios.get(
      `http://localhost:3000/api/user/${currentUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setUser(res.data);
  } catch (err) {
    console.error("Failed to fetch user", err);
  }
};


useEffect(() => {
   fetchUser();
  //  fetchChatIfMissing();
}, []);

 const navigate  = useNavigate()
 const value = {
  directMessages,
  groupChats,
  messages,
  navigate,
  sharedMedia,
  token,
  setToken,
  selectedChat,
  setSelectedChat,
  chatMessages,
  setChatMessages,
  user, 
  setUser
};


  return (
    <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
  );
};
