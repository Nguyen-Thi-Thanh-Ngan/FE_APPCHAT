import {wsService} from '../services/WebSocketService';
import {useState} from "react";
import {getRoomChatMessages} from "./GetRoomChat";

interface RoomDetails {
    id: number;
    name: string;
    owner: string;
    // userList: userList[];
    chatData: ChatData[];
}

interface ChatData {
    id: number;
    name: string;
    mes: string;
    createAt: string;
}

export const sendChatToRoom = (
    getPeopleQuery: string,
    messageValue: string,
    setPeopleChatData: React.Dispatch<React.SetStateAction<ChatData[]>>,
    peopleChatData: ChatData[],
    setMessageValue: React.Dispatch<React.SetStateAction<string>>
) => {
    const getPeopleMessage = {
        action: 'onchat',
        data: {
            event: 'GET_ROOM_CHAT_MES',
            data: {
                name: getPeopleQuery,
                page: 1,
            },
        },
    };

    wsService.sendMessage(getPeopleMessage);

    wsService.onMessage((response) => {
        const result = JSON.parse(response.data);

        if (result.status === 'success') {
            const addUserMessage = {
                action: 'onchat',
                data: {
                    event: 'SEND_CHAT',
                    data: {
                        type: 'room',
                        to: getPeopleQuery,
                        mes: messageValue,
                    },
                },
            };
            wsService.sendMessage(addUserMessage);

            // Clear input value after sending message
            setMessageValue('');

            // Update chat data state with new message
            const newMessage: ChatData = {
                id: result.data.chatData.id,
                name: result.data.chatData.name,
                mes: result.data.chatData.mes,
                createAt: result.data.chatData.createAt,
            };

            setPeopleChatData([...peopleChatData, newMessage]);
        }
    });
};