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
    const navigate = useNavigate();
    const value = {
        
        directMessages,groupChats
    }

    return (
        <ChatContext.Provider value={value}>
          {props.children}
        </ChatContext.Provider>
    )
}
