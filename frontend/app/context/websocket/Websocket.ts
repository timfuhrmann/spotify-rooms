import SockJS from "sockjs-client";

type MessageHandler = (payload?: any) => void;

export interface ConnectingState {
    connecting: boolean;
}

let websocket: WebSocket | null = null;
let reconnectTimeout: number | null = null;
let isActive = false;
let url: string | null = process.env.NEXT_PUBLIC_WEBSOCKET_URL || null;
let onConnectingFunction: (state: ConnectingState) => void = () => {};
const messageHandler: Record<string, MessageHandler> = {};

export const Websocket = {
    connect,
    disconnect,
    onConnecting,
    addMessageHandler,
    sendAction,
};

function connect(): void {
    if (url === null) {
        return;
    }

    if (null !== websocket && websocket.OPEN) {
        websocket.close();
    }

    onConnectingFunction({ connecting: true });

    isActive = true;
    websocket = new SockJS(url);
    websocket.onopen = () => {
        onConnectingFunction({ connecting: false });

        if (null !== websocket) {
            sendAction("ON_WELCOME");
        }
    };

    websocket.onmessage = onMessage;
    websocket.onerror = reconnect;
    websocket.onclose = reconnect;
}

function disconnect(): void {
    isActive = false;

    if (null !== websocket && websocket.OPEN) {
        // do not reconnect if a close is requested
        websocket.onclose = () => {};
        websocket.close();
    }

    if (reconnectTimeout !== null) {
        clearTimeout(reconnectTimeout);
    }

    onConnectingFunction({ connecting: false });
}

function reconnect(): void {
    if (!isActive) {
        onConnectingFunction({ connecting: false });
        return;
    }

    if (reconnectTimeout !== null) {
        clearTimeout(reconnectTimeout);
    }

    reconnectTimeout = window.setTimeout(() => {
        connect();
    }, 500);
}

function onConnecting(on: (state: ConnectingState) => void): void {
    onConnectingFunction = on;
}

function addMessageHandler(event: string, handler: MessageHandler): void {
    messageHandler[event] = handler;
}

function onMessage(event: MessageEvent): void {
    const data = JSON.parse(event.data) as {
        e: string;
        p?: any;
    };

    const handler = messageHandler[data.e];

    handler ? handler(data.p) : console.error(`No event handler vor event ${data.e}`);
}

function sendAction(action: string, data?: object): void {
    if (!isActive || null === websocket || websocket.readyState !== websocket.OPEN) {
        return;
    }

    websocket.send(
        JSON.stringify({
            e: action,
            p: data,
        })
    );
}
