import {createContext, use} from 'react'
import { useNavigate } from 'react-router-dom'

export const ChatContext = createContext()

export const ChatContextProvider = (props)=>{

     const directMessages = [
    {
      id: "1",
      name: "Alex Johnson",
      lastMessage: "Hey, how are you?",
      unread: 2,
    },
    { id: "2", name: "Sam Wilson", lastMessage: "Meeting at 3 PM", unread: 0 },
    { id: "3", name: "Sam Wilson", lastMessage: "Meeting at 3 PM", unread: 0 },
    { id: "4", name: "Sam Wilson", lastMessage: "Meeting at 3 PM", unread: 0 },
    { id: "5", name: "Sam Wilson", lastMessage: "Meeting at 3 PM", unread: 0 },
    { id: "6", name: "Sam Wilson", lastMessage: "Meeting at 3 PM", unread: 0 },
  ];

    const groupChats = [
    { id: "general", name: "General", members: 12, unread: 5 },
    { id: "random", name: "Random", members: 8, unread: 0 },
    { id: "rando", name: "Random", members: 8, unread: 0 },
    { id: "rand", name: "Random", members: 8, unread: 0 },
    { id: "ran", name: "Random", members: 8, unread: 0 },
    { id: "ra", name: "Random", members: 8, unread: 0 },
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
      const sharedMedia = [
    { id: 1, type: "image", preview: "photo1.jpg", date: "Today, 10:30 AM" },
    { id: 2, type: "file", name: "document.pdf", date: "Yesterday" }
  ];

    const navigate = useNavigate();
    const value = {  
      directMessages,groupChats, messages,navigate, sharedMedia

    }

    return (
        <ChatContext.Provider value={value}>
          {props.children}
        </ChatContext.Provider>
    )
}
