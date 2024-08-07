import { wsService } from "../services/WebSocketService";

interface userList {
    id: number;
    name: string;
    type: number;
}

interface RoomDetails {
    id: number;
    name: string;
    owner: string;
    userList: userList[];
    chatData: chatData[];
}

interface chatData {
    id: number;
    name: string;
    type: number;
    mes: string;
    createAt: string;
}

export const getRoomChatMessages = (roomName: string, page: number, callback: (roomDetails: RoomDetails) => void) => {
    const getRoomChatMesMessage = {
        "action": "onchat",
        "data": {
            "event": "GET_ROOM_CHAT_MES",
            "data": {
                "name": roomName,
                "page": page
            }
        }
    };

    wsService.sendMessage(getRoomChatMesMessage);

    wsService.onMessage((response) => {
        const result = JSON.parse(response.data);

        if (result.status === 'success') {
            const roomDetails = {
                id: result.data.id,
                name: result.data.name,
                owner: result.data.own,
                userList: Array.isArray(result.data.userList) ? result.data.userList.map((user: any) => ({
                    id: user.id,
                    name: user.name,
                    type: user.type || 0
                })) : [],
                chatData: Array.isArray(result.data.chatData) ? result.data.chatData.map((message: any) => ({
                    id: message.id,
                    name: message.name,
                    type: message.type || 1,
                    mes: decodeURIComponent(message.mes),
                    createAt: message.createAt
                })) : []
            };
            callback(roomDetails);
        } else {
            alert('Tải tin nhắn không thành công');
        }
    });
};