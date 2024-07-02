import {useState} from 'react';
import {wsService} from '../services/WebSocketService';


export const useChatRoomState = () => {

    const [successMessage1, setSuccessMessage1] = useState<string | null>(null);
    const [joinRoomQuery, setJoinRoomQuery] = useState(''); //Lưu trữ và cập nhật giá trị truy vấn tìm kiếm khi người dùng nhập vào ô tìm kiếm.


    return {
        successMessage1, setSuccessMessage1,
        joinRoomQuery: joinRoomQuery,
        setJoinRoomQuery: setJoinRoomQuery,
    };
};

export const handleJoinRoomChat = (
    joinRoomQuery: string,
    setJoinRoomQuery: React.Dispatch<React.SetStateAction<string>>,
) => {
    const joinRoomMessage = {
        "action": "onchat",
        "data": {
            "event": "JOIN_ROOM",
            "data": {
                "name": joinRoomQuery
            }
        }
    };

    wsService.sendMessage(joinRoomMessage);

    wsService.onMessage((response) => {
        const result = JSON.parse(response.data);

        if (result.status === 'success') {
            setJoinRoomQuery('');

            alert('Thêm vào thành công');
        } else {
            alert('Bạn đã có trong nhóm này');
        }
    });
};
