import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";

export const APP_COOKIES = "SPOTIFY_ROOMS_AUTHENTICATION";

export const getAccessTokenFromCookies = (cookies: NextApiRequestCookies): string => {
    const json = cookies[APP_COOKIES];

    if (json) {
        const { access_token } = JSON.parse(json);
        return access_token;
    }

    return "";
};
