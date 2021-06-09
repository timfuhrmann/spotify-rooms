import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";
import { GetServerSidePropsContext } from "next";
import { validateBrowser } from "../Browser";

export const APP_COOKIES = "SPOTIFY_ROOMS_AUTHENTICATION";

export const COOKIES_SET_OPTIONS = {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 10,
    secure: "development" !== process.env.NODE_ENV,
};

export const COOKIES_DEL_OPTIONS = {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
    secure: "development" !== process.env.NODE_ENV,
};

export const getAccessTokenFromCookies = (cookies: NextApiRequestCookies): string => {
    const json = cookies[APP_COOKIES];

    if (json) {
        const { access_token } = JSON.parse(json);
        return access_token;
    }

    return "";
};

export const checkAccessToken = (context: GetServerSidePropsContext, token?: string) => {
    let access_token = getAccessTokenFromCookies(context.req.cookies);

    if (token) {
        access_token = token;
    }

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
