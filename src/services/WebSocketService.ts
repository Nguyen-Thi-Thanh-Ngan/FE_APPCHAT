
export class WebSocketService {
    private socket: WebSocket;

    constructor(private url: string) {
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log('Đã kết nối WebSocket');
        };

        this.socket.onmessage = (event) => {
            console.log('Nhận được tin nhắn WebSocket:', event);
        };

        this.socket.onerror = (error) => {
            console.error('Lỗi WebSocket:', error);
        };

        this.socket.onclose = () => {
            console.log('Đã đóng kết nối WebSocket');
        };
    }

    sendMessage(message: object) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket chưa mở. Trạng thái:', this.socket.readyState);
        }
    }
}
