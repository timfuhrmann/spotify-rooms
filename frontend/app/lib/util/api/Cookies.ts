import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";
import { GetServerSidePropsContext } from "next";
import { validateBrowser } from "../Browser";

export const APP_COOKIES = "SPOTIFY_ROOMS_AUTHENTICATION";

export const getAccessTokenFromCookies = (cookies: NextApiRequestCookies): string => {
    const json = cookies[APP_COOKIES];

    if (json) {
        const { access_token } = JSON.parse(json);
        return access_token;
    }

    return "";
};

export const getCookieDate = () => {
    const result = new Date();
    result.setDate(result.getDate() + 10);
    return result;
};

export const getExpiredCookieDate = () => {
    const result = new Date();
    result.setDate(result.getDate() - 10);
    return result;
};

export const checkAccessToken = (context: GetServerSidePropsContext) => {
    const access_token = getAccessTokenFromCookies(context.req.cookies);

    if (access_token) {
        return validateBrowser(context, {
            authToken: access_token,
        });
    } else {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
};
