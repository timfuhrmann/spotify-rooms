export const db = <T>(url: string, options: RequestInit = {}): Promise<T> => {
    return fetch(url, options)
        .then(res => {
            const contentType = res.headers.get("content-type");
            if (contentType.includes("application/json")) {
                return res.json();
            } else {
                return res;
            }
        })
        .catch(console.error);
};
