import {wsService} from '../services/WebSocketService';

export const getPeopleChatRoom = (getPeopleQuery: String) => {
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

        }else{
            alert('Tài khoản không tồn tại hoặc đã vô hiệu hóa');
        }
    });


}