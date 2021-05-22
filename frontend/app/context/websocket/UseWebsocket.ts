import { useEffect, useRef, useState } from "react";

type MessageHandler = (payload?: any) => void;

interface UseWebsocketData {
    connected: boolean;
    connect: (rid: string) => void;
    disconnect: () => void;
    sendAction: (action: string, data?: object) => void;
    onMessage: (event: MessageEvent) => void;
    addMessageHandler: (event: string, handler: MessageHandler) => void;
}

export const useWebsocket = (): UseWebsocketData => {
    const [websocket, setWebsocket] = useState<WebSocket>(null);
    const [connecting, setConnecting] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);
    const [roomId, setRoomId] = useState<string>("");
    const [messageHandler, setMessageHandler] = useState<Record<string, MessageHandler>>({});
    const reconnectTimeout = useRef<number>(null);

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

    const connect = (rid: string) => {
        if (null !== websocket && websocket.OPEN) {
            websocket.close();
        }

        setConnecting(true);
        setActive(true);
        setRoomId(rid);

        const ws = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL + (rid ? "/" + rid : ""));
        setWebsocket(ws);
    };

    const disconnect = () => {
        setActive(false);

        if (null !== websocket && websocket.OPEN) {
            websocket.onclose = () => {};
            websocket.close();
        }

        if (reconnectTimeout !== null) {
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
            connect(roomId);
        }, 2000);
    };

    const onMessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data) as {
            e: string;
            p?: any;
        };

        const handler = messageHandler[data.e];

        handler ? handler(data.p) : console.error(`No event handler vor event ${data.e}`);
    };

    const sendAction = (action: string, data?: object) => {
        if (!active || null === websocket || websocket.readyState !== websocket.OPEN) {
            return;
        }

        websocket.send(
            JSON.stringify({
                rid: roomId,
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
