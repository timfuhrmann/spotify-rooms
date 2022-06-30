export const db = <T>(url: string, options: RequestInit = {}, onAuthError?: () => void): Promise<T> => {
    return fetch(url, options)
        .then(res => {
            if (onAuthError && res.status === 401) {
                onAuthError();
            }

            const contentType = res.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                return res.json();
            } else {
                return res;
            }
        })
        .then(res => {
            return res;
        })
        .catch(console.error);
};
