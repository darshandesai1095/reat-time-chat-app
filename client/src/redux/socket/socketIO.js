import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { pushMessageToChatLog } from "../features/chatLogs/chatLogSlice";

// connect to socket.io
const URL = "http://localhost:8080"
export const socket = io(URL, {
        reconnection: true,       
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000
    })


// join rooms setup in redux chatLogSlice
// send message setup in redux chatLogSlice


export const socketIoListenForMessage = (dispatch) => {
    socket.on("message", (messageData) => {
        dispatch(pushMessageToChatLog(messageData))
    })
}