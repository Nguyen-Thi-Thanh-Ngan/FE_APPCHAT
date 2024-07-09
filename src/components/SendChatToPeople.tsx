import {wsService} from '../services/WebSocketService';
import {getPeopleChatRoom} from "./GetPeopleChat";


interface ChatData {
    id: number;
    name: string;
    mes: string;
    createAt: string;
}

export const sendChatToPeople = (
    getPeopleQuery: string,
    messageValue: string,
    setPeopleChatData: React.Dispatch<React.SetStateAction<ChatData[]>>,
    peopleChatData: ChatData[],
    setMessageValue: React.Dispatch<React.SetStateAction<string>>
) => {
    const getPeopleMessage = {
        action: 'onchat',
        data: {
            event: 'GET_PEOPLE_CHAT_MES',
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
                        type: 'people',
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
                id: result.data.id,
                name: result.data.name,
                mes: result.data.mes,
                createAt: result.data.createAt,
            };

            setPeopleChatData([...peopleChatData, newMessage]);


        }
    });
};