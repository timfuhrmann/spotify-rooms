export const getBaseUrl = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
        throw new Error("Environment variable NEXT_PUBLIC_BASE_URL seems to be undefined.")
    }

    return baseUrl;
}