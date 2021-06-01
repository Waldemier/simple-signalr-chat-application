import React from 'react';

import { HubConnectionBuilder } from "@microsoft/signalr";

import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

export default function Chat() {

    const [connection, setConnection] = React.useState(null);
    const [chat, setChat] = React.useState([]);
    const latestChat = React.useRef(null);

    latestChat.current = chat;

    React.useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:10000/hubs/chat")
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    React.useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log("CONNECTED");

                    connection.on("ReceiveMessage", message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);

                        setChat(updatedChat);
                    });
                })
                .catch(error => console.error("CONNECTION FAILED", error));
        }
    }, [connection]);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };

        if (connection.connectionStarted) {
            try {
                // await connection.send("SendMessage", chatMessage); // commented, because we created the controller
                await fetch("http://localhost:10000/chat/messages", {
                    method: "POST",
                    body: JSON.stringify(chatMessage),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            alert("No connection to server yet.");
        }
    }

    return (
        <div>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat} />
        </div>
    )
}
