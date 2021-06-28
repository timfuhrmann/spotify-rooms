import { clientRequestRefresh } from "./auth";

// 'SetAuthToken' comes from SpotifyContext and is used to update the auth token
// in case of reauthorization (401).
export const db = <T>(url: string, options: RequestInit = {}, setAuthToken?: (token: string) => void): Promise<T> => {
    return fetch(url, options)
        .then(res => {
            if (setAuthToken && res.status === 401) {
                clientRequestRefresh().then(setAuthToken);
            }

            const contentType = res.headers.get("content-type");
            if (contentType.includes("application/json")) {
                return res.json();
            } else {
                return res;
            }
        })
        .catch(console.error);
};
