import {useState} from 'react';
import {wsService} from '../services/WebSocketService';


interface Room {
    name: string;
    type: number;
}


// React.Dispatch<React.SetStateAction<Room[]>> nhận vào giá trị mới của mảng hoặc một hàm cập nhật mảng.
export const useChatState = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [createRoomQuery, setCreateRoomQuery] = useState(''); //Lưu trữ và cập nhật giá trị truy vấn tìm kiếm khi người dùng nhập vào ô tìm kiếm.
    const [addedChatRoom, setAddedChatRoom] = useState<Room[]>([]);

    return {
        successMessage, setSuccessMessage,
        createRoomQuery, setCreateRoomQuery,
        addedChatRoom, setAddedChatRoom,
    };
};
export const handleSearch = (event: React.ChangeEvent<HTMLInputElement>, setCreateRoomQuery: React.Dispatch<React.SetStateAction<string>>) => {
    setCreateRoomQuery(event.target.value); // lấy giá trị hiện tại của ô nhập liệu và cập nhật vào biến searchQuery

};

export const handleCreateRoomChat = (
    createRoomQuery: string,
    addedChatRoom: Room[], // Thêm mảng chatRooms
    setAddedChatRoom: React.Dispatch<React.SetStateAction<Room[]>>, // dùng đẻ cập nhật mảng chatRooms
    setCreateRoomQuery: React.Dispatch<React.SetStateAction<string>>
) => {
    const createRoomMessage = {
        "action": "onchat",
        "data": {
            "event": "CREATE_ROOM",
            "data": {
                "name": createRoomQuery
            }
        }
    };

    wsService.sendMessage(createRoomMessage);

    wsService.onMessage((response) => {
        const result = JSON.parse(response.data);

        if (result.status === 'success') {
            const newRoom = { name: result.data.name, type: 1 };

            setCreateRoomQuery('');
            setAddedChatRoom([...addedChatRoom, newRoom]); // thêm roomchat vào mảng, cập nhật mảng addedChatRoom

            const updatedRooms = [...addedChatRoom, newRoom];
            const roomNames = updatedRooms.map(room => room.name);
            localStorage.setItem('roomNames', JSON.stringify(roomNames));

            alert('Tạo phòng chat thành công');
        } else if (result.status === 'error'){

            const newUser = { name: createRoomQuery, type: 0 };

            setCreateRoomQuery('');
            setAddedChatRoom([...addedChatRoom, newUser]);

            const updatedUsers = [...addedChatRoom, newUser];
            const userNames = updatedUsers.map(user => user.name);
            localStorage.setItem('userNames', JSON.stringify(userNames));

            alert('Thêm người chat thành công.');
        }
    });
};



// Hàm này sẽ gửi yêu cầu lấy danh sách phòng chat va hiển thị lên màn hình
export const getUserList = (callback: (rooms: Room[]) => void) => {
    const getUserListMessage = {
        "action": "onchat",
        "data": {
            "event": "GET_USER_LIST"
        }
    };

    wsService.sendMessage(getUserListMessage);

    wsService.onMessage((response) => {
        try {
            const result = JSON.parse(response.data);

            if (result.status === 'success') {
                if (Array.isArray(result.data)) {
                    const rooms = result.data.map((room: any) => ({
                        name: room.name,
                        type: room.type,
                        actionTime: room.actionTime,
                    }));
                    callback(rooms);
                } else {
                    console.error("result.data is not an array");
                }
            }
        } catch (error) {
            console.error("Error parsing response:", error);
        }
    });
};


export const handleGetUserList = (setAddedChatRoom: React.Dispatch<React.SetStateAction<Room[]>>) => {
    getUserList((rooms) => {
        setAddedChatRoom(rooms);
    });
};

