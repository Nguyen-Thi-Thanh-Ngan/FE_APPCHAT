import {wsService} from '../services/WebSocketService';
import {useState} from "react";

export const usePeopleChatState = () => {
    const [roomNames, setRoomNames] = useState<string[]>([]);
    const [userNames, setUserNames] = useState<string[]>([]);
    const [currentRoom, setCurrentRoom] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    return {
        roomNames, setRoomNames,
        userNames, setUserNames,
        currentRoom, setCurrentRoom,
        error, setError
    };
};

export const getPeopleChatRoom = (getPeopleQuery: String, message: String) => {
    const getPeopleMessage = {
        "action": "onchat",
        "data": {
            "event": "GET_PEOPLE_CHAT_MES",
            "data": {
                "name": getPeopleQuery,
                "page": 1
            }
        }
    };

    wsService.sendMessage(getPeopleMessage);

    wsService.onMessage((response) => {
        const result = JSON.parse(response.data);

        if (result.status === 'success') {
            const addUserMessage = {
                "action": "onchat",
                "data": {
                    "event": "SEND_CHAT",
                    "data": {
                        "type": "people",
                        "to": getPeopleQuery,
                        "mes": message
                    }
                }
            };
            wsService.sendMessage(addUserMessage);
            wsService.onMessage((response) => {
                const result = JSON.parse(response.data);

                if (result.status === 'success') {
                    console.log(result)
                }
            });
        }
    });
}