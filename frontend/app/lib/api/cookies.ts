import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";
import { GetServerSidePropsContext } from "next";
import { validateBrowser } from "../util/Browser";
import { refreshAccessToken } from "./auth";
import { setCookie } from "nookies";

interface CheckAccessTokenOptions {
    redirectDirection: "dashboard" | "login";
    preventRedirect?: boolean;
}

const optionsDefault: CheckAccessTokenOptions = {
    redirectDirection: "login",
};

export const APP_COOKIES_AUTH = "SPOTIFY_ROOMS_AUTHENTICATION";

export const APP_COOKIES_ACCESS = "SPOTIFY_ROOMS_ACCESS";

export const COOKIES_SET_OPTIONS = (maxAge = 60 * 60 * 24 * 10) => {
    return {
        httpOnly: true,
        path: "/",
        secure: "development" !== process.env.NODE_ENV,
        maxAge,
    };
};

export const COOKIES_DEL_OPTIONS = {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
    secure: "development" !== process.env.NODE_ENV,
};

export const accessTokenFromCookies = (cookies: NextApiRequestCookies): string => {
    return cookies[APP_COOKIES_ACCESS] || "";
};

export const refreshTokenFromCookies = (cookies: NextApiRequestCookies): string => {
    const auth = cookies[APP_COOKIES_AUTH];

    if (auth) {
        const { refresh_token } = JSON.parse(auth);
        return refresh_token;
    }

    return "";
};

export const checkAccessToken = async (
    ctx: GetServerSidePropsContext,
    options: CheckAccessTokenOptions = optionsDefault
) => {
    let access_token = accessTokenFromCookies(ctx.req.cookies);
    let refresh_token = refreshTokenFromCookies(ctx.req.cookies);

    if (!access_token && refresh_token) {
        const auth = await refreshAccessToken(refresh_token);

        if (auth.access_token) {
            setCookie(ctx, APP_COOKIES_ACCESS, auth.access_token, COOKIES_SET_OPTIONS(auth.expires_in));
            access_token = auth.access_token;
        }
    }

    if ("dashboard" === options.redirectDirection) {
        if (access_token && !options.preventRedirect) {
            return {
                redirect: {
                    destination: "/dashboard",
                    permanent: false,
                },
            };
        }
    } else {
        if (access_token) {
            return validateBrowser(ctx, {
                authToken: access_token,
            });
        } else if (!options.preventRedirect) {
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            };
        }
    }

    return validateBrowser(ctx);
};
