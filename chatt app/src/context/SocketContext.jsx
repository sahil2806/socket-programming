/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useRef, useEffect } from "react";
import io from "socket.io-client";
import { useAppStore } from "@/store";
// import { HOST } from "@/utils/constants";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo, addMessage } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io("http://localhost:8747", {
        withCredentials: true,
        query: { userId: userInfo._id },
      });

      socket.current.on("connect", () => {
        console.log(`Connected to Socket Server`);
      });

      const handleReceiveMessage = (message) => {
        const { selectedChatType, selectedChatData,addMessage } = useAppStore.getState();
        if (
          selectedChatType === "contact" &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id)
        ) {
          addMessage(message);
        }
        // addMessageInDMList(message)
      };

      const handleReceiveChannelMessage = (message) => {
        // console.log("Received channel message:", message);
        const { selectedChatType, selectedChatData,addMessage } = useAppStore.getState();
        if (
          selectedChatType === "channel" &&
          selectedChatData._id === message.channelId
        ) {
          addMessage(message);
        }
        // addChannelInChannelList(message)
      };

      socket.current.on("recieveMessage", handleReceiveMessage);
      socket.current.on("receive-channel-message", handleReceiveChannelMessage);

      return () => {
        console.log("Disconnecting socket");
        socket.current.off("recieveMessage", handleReceiveMessage);
        socket.current.off("receive-channel-message", handleReceiveChannelMessage);
        socket.current.disconnect();
      };
    }
  }, [userInfo, addMessage]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};