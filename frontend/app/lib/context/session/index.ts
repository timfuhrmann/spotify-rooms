import { createContext, useContext } from "react";

interface SessionContextData {
    authToken: string | null;
    refreshAuthToken: () => Promise<void>;
}

export const SessionContext = createContext<SessionContextData>({} as SessionContextData);

export const useSession = () => useContext(SessionContext);
