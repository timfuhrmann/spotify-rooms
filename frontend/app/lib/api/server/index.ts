import { refreshAccessToken } from "../auth";
import { setCookie } from "nookies";
import { APP_COOKIES_ACCESS, getCookieSetOptions, refreshTokenFromCookies } from "@lib/cookie";
import { NextRequest, NextResponse } from "next/server";

export const validateAuthentication = async (req: NextRequest, res: NextResponse): Promise<string | undefined> => {
    let access_token = req.cookies.get(APP_COOKIES_ACCESS);
    let refresh_token = refreshTokenFromCookies(req.cookies);

    if (!access_token && refresh_token) {
        const auth = await refreshAccessToken(refresh_token);

        if (auth.access_token) {
            setCookie({ res }, APP_COOKIES_ACCESS, auth.access_token, getCookieSetOptions(auth.expires_in));
            return auth.access_token;
        }
    }

    return access_token;
};
