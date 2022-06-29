import { refreshAuthToken } from "./auth";
import { APP_COOKIES_ACCESS, APP_COOKIES_REFRESH, getCookieSetOptions } from "@lib/cookie";
import { NextRequest, NextResponse } from "next/server";

export const validateAuthentication = async (req: NextRequest, res: NextResponse): Promise<string | undefined> => {
    const access_token = req.cookies.get(APP_COOKIES_ACCESS);
    const refresh_token = req.cookies.get(APP_COOKIES_REFRESH);

    if (!access_token && refresh_token) {
        const auth = await refreshAuthToken(refresh_token);

        if (auth.access_token) {
            res.cookies.set(APP_COOKIES_ACCESS, auth.access_token, getCookieSetOptions(auth.expires_in));
            return auth.access_token;
        }
    }

    return access_token;
};
