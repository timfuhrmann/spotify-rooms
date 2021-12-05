import { GetServerSidePropsContext } from "next";
import { refreshAccessToken } from "../auth";
import { setCookie } from "nookies";
import { checkBrowserCompatibility } from "../../util/browser";
import { accessTokenFromCookies, APP_COOKIES_ACCESS, COOKIES_SET_OPTIONS, refreshTokenFromCookies } from "../cookies";

/**
 * Check if user is authenticated.
 * If access_token is expired, but refresh_token is available, refresh and save new access_token.
 * @param {GetServerSidePropsContext} ctx
 * @returns {Promise<string | null>}
 */
export const validateAuthentication = async (ctx: GetServerSidePropsContext): Promise<string | null> => {
    let access_token = accessTokenFromCookies(ctx.req.cookies);
    let refresh_token = refreshTokenFromCookies(ctx.req.cookies);

    if (!access_token && refresh_token) {
        const auth = await refreshAccessToken(refresh_token);

        if (auth.access_token) {
            setCookie(ctx, APP_COOKIES_ACCESS, auth.access_token, COOKIES_SET_OPTIONS(auth.expires_in));
            return auth.access_token;
        }
    }

    return access_token;
};

/**
 * Check if browser is compatible by inspecting the user agent.
 * @param {GetServerSidePropsContext} ctx
 * @returns {boolean}
 */
export const validateBrowser = (ctx: GetServerSidePropsContext): boolean => {
    const ua = ctx.req.headers["user-agent"];
    return checkBrowserCompatibility(ua);
};
