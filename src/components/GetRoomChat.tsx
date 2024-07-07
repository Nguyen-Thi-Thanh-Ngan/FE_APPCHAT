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
    // userList: userList[];
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
                // userList: result.data.userList.map((user: any) => ({
                //     id: user.id,
                //     name: user.name,
                //     type: 0 // Assuming type 0 for users in this case
                // }))
            };
            callback(roomDetails);
        } else {
            alert('Tải tin nhắn không thành công');
        }
    });
};
