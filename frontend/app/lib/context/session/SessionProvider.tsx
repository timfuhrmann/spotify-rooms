import React, { PropsWithChildren, useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { SessionContext } from "@lib/context/session/index";
import { db } from "@lib/api";
import { Api } from "@type/api";

export const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);

    useEffect(() => {
        db<Api.SessionResponse>("/api/auth/session").then(res => {
            if (res.data && res.status === 200) {
                setAuthToken(res.data.access_token);
            }
        });
    }, []);

    const refreshAuthToken = useCallback(
        debounce(
            async () => {
                const res = await fetch("/api/auth/refresh").then(res => res.json());
                setAuthToken(res.data.access_token);
            },
            10000,
            { leading: true }
        ),
        []
    );

    return <SessionContext.Provider value={{ authToken, refreshAuthToken }}>{children}</SessionContext.Provider>;
};
