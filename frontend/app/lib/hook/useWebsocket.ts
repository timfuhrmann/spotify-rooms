import { useEffect, useRef, useState } from "react";

type MessageHandler = (payload?: any) => void;

interface WebsocketData {
    connected: boolean;
    connect: () => void;
    disconnect: () => void;
    sendAction: (action: string, data?: object) => void;
    onMessage: (event: MessageEvent) => void;
    addMessageHandler: (event: string, handler: MessageHandler) => void;
}

export const useWebsocket = (): WebsocketData => {
    const reconnectTimeout = useRef<number | null>(null);
    const [websocket, setWebsocket] = useState<WebSocket | null>(null);
    const [connecting, setConnecting] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);
    const [messageHandler, setMessageHandler] = useState<Record<string, MessageHandler>>({});

    useEffect(() => {
        if (!websocket) {
            return;
        }

        websocket.onopen = () => {
            setConnecting(false);

            if (null !== websocket) {
                sendAction("ON_WELCOME", null);
            }
        };

        websocket.onmessage = onMessage;
        websocket.onerror = reconnect;
        websocket.onclose = reconnect;
    }, [websocket]);

    const connect = () => {
        if (websocket !== null && websocket.OPEN) {
            websocket.close();
        }

        setConnecting(true);
        setActive(true);

        const url = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

        if (!url) {
            throw new Error("NEXT_PUBLIC_WEBSOCKET_URL is undefined");
        }

        const ws = new WebSocket(url);
        setWebsocket(ws);
    };

    const disconnect = () => {
        setActive(false);

        if (null !== websocket && websocket.OPEN) {
            websocket.onclose = () => {};
            websocket.close();
        }

        if (reconnectTimeout.current) {
            clearTimeout(reconnectTimeout.current);
            reconnectTimeout.current = null;
        }

        setConnecting(false);
    };

    const reconnect = () => {
        if (!active) {
            setConnecting(false);
            return;
        }

        if (reconnectTimeout.current !== null) {
            clearTimeout(reconnectTimeout.current);
            reconnectTimeout.current = null;
        }

        reconnectTimeout.current = window.setTimeout(() => {
            connect();
        }, 2000);
    };

    const onMessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data) as {
            e: string;
            p?: any;
        };

        const handler = messageHandler[data.e];

        if (handler) {
            handler(data.p);
        } else {
            console.error(`No event handler for event ${data.e}`);
        }
    };

    const sendAction = (action: string, data?: object | null) => {
        if (!active || null === websocket || websocket.readyState !== websocket.OPEN) {
            return;
        }

        websocket.send(
            JSON.stringify({
                e: action,
                p: data,
            })
        );
    };

    const addMessageHandler = (event: string, handler: MessageHandler) => {
        setMessageHandler(prevState => {
            prevState[event] = handler;
            return prevState;
        });
    };

    return {
        connected: active && !connecting,
        connect,
        disconnect,
        sendAction,
        onMessage,
        addMessageHandler,
    };
};
