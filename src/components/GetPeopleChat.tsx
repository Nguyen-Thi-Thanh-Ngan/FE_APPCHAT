import {wsService} from '../services/WebSocketService';


interface ChatData {
    id: number;
    name: string;
    mes: string;
    createAt: string;
}

export const getPeopleChatRoom = (getPeopleQuery: string, page: number, callback: (data: ChatData[]) => void) => {
    const getPeopleMessage = {
        "action": "onchat",
        "data": {
            "event": "GET_PEOPLE_CHAT_MES",
            "data": {
                "name": getPeopleQuery,
                "page": page
            }
        }
    };

    wsService.sendMessage(getPeopleMessage);

    wsService.onMessage((response) => {
            const result = JSON.parse(response.data);

            if (result.status === 'success') {
                if (result.status === 'success') {
                    const chatData = Array.isArray(result.data) ? result.data.map((message: any) => ({
                        id: message.id,
                        name: message.name,
                        mes: message.mes,
                        createAt: message.createAt
                    })) : [];
                    callback(chatData);

                }
            }

    });

};