import { useState } from 'react';
import { wsService } from '../services/WebSocketService';
import { NavigateFunction } from 'react-router-dom';

interface Member {
    name: string;
}

export const useChatState = () => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [addedMembers, setAddedMembers] = useState<Member[]>([]);

    return { successMessage, setSuccessMessage, searchQuery, setSearchQuery, addedMembers, setAddedMembers };
};

export const handleSearch = (event: React.ChangeEvent<HTMLInputElement>, setSearchQuery: React.Dispatch<React.SetStateAction<string>>) => {
    setSearchQuery(event.target.value);
};

export const handleAddUserChat = (
    searchQuery: string,
    addedMembers: Member[],
    setAddedMembers: React.Dispatch<React.SetStateAction<Member[]>>,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
) => {
    const createRoomMessage = {
        "action": "onchat",
        "data": {
            "event": "CREATE_ROOM",
            "data": {
                "name": searchQuery
            }
        }
    };

    wsService.sendMessage(createRoomMessage);

    wsService.onMessage((response) => {
        const result = JSON.parse(response.data);

        if (result.status === 'success') {
            const newMember = { name: result.data.name };
            setAddedMembers([...addedMembers, newMember]);
            setSearchQuery('');
            alert('Tạo phòng chat thành công')
        } else {
            alert('Phòng chat đã tồn tại');
        }
    });
};
