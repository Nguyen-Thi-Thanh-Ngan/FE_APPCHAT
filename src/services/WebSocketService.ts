export class WebSocketService {
    private socket: WebSocket;
    private messageCallback: ((message: MessageEvent) => void) | null = null;
    private url: string;

    constructor(url: string) {
        this.url = url;
        this.socket = new WebSocket(url);
        this.connect();
    }
    private connect(){
        this.socket = new WebSocket(this.url);

        //tạo một WebSocketService để kết nối với server WebSocket
        this.socket.onopen = (message) => {
            console.log('WebSocket connection opened');
        };
        // Khi kết nối mở, in ra thông báo "WebSocket connection opened"
        this.socket.onclose = () => {
            console.log('WebSocket connection closed');
        };
        // Khi kết nối đóng, in ra thông báo "WebSocket connection closed"
        this.socket.onmessage = (message) => {
            console.log('WebSocket message received:', message.data);
            if (this.messageCallback) {
                this.messageCallback(message);
            }
        };
    }
    // Khi nhận được message từ server, in ra thông báo "WebSocket message received:" và gọi hàm messageCallback với tham số là message được parse từ event.data
    sendMessage(message: any) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            console.log('WebSocket is not open');
            this.socket?.close();
            this.connect();
            this.socket!.onopen = () => {
                this.socket!.send(JSON.stringify(message));
            };
        }
    }
    // Gửi message tới server dưới dạng JSON string
    onMessage(callback: ((message: MessageEvent) => void) | null) {
        this.messageCallback = callback;
    }
    // Gán hàm callback cho messageCallback
    removeMessageListener() {
        this.messageCallback = null;
    }
    reConnect(){
        if (this.socket.readyState !== WebSocket.CLOSED) {
            console.warn('WebSocket is not closed. Cannot reconnect.');
            return;
        }
        this.connect();
    }
}

const wsUrl = 'ws://140.238.54.136:8080/chat/chat';
export const wsService = new WebSocketService(wsUrl);
