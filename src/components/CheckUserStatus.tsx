// apiService.ts

import { wsService } from '../services/WebSocketService';

export const checkUserStatus = (userName: string, callback: (isOnline: boolean) => void) => {
    const checkUserMessage = {
        action: 'onchat',
        data: {
            event: 'CHECK_USER',
            data: {
                user: userName
            }
        }
    };

    wsService.sendMessage(checkUserMessage);

    wsService.onMessage((response) => {
        try {
            const result = JSON.parse(response.data);
            if (result.event === 'CHECK_USER' && result.status === 'success') {
                const isUserOnline = result.data?.status;
                callback(isUserOnline);
            }
        } catch (error) {
            console.error('Error parsing CHECK_USER response:', error);
        }
    });
};
