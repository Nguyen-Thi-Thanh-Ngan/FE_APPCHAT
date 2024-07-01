
import {wsService} from '../services/WebSocketService';
import {NavigateFunction} from "react-router-dom";

export const handleLogout = (
    event: React.FormEvent<HTMLFormElement>,
    setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>,
    navigate: NavigateFunction
) => {
    event.preventDefault();

    const logoutMessage = {
        "action": "onchat",
        "data": {
            "event": "LOGOUT"
        }
    }

    wsService.sendMessage(logoutMessage);
    setSuccessMessage(null);
    navigate('/login');
};
