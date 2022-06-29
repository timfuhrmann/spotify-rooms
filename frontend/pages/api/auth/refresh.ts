import { NextApiRequest, NextApiResponse } from "next";
import { APP_COOKIES_ACCESS, APP_COOKIES_REFRESH, getCookieSetOptions } from "@lib/cookie";
import { refreshAuthToken } from "@lib/api/server/auth";
import { Api } from "@type/api";
import { setCookie } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Api.RefreshResponse>) {
    const refresh_token = req.cookies[APP_COOKIES_REFRESH];

    if (!refresh_token) {
        return res.status(401).json({
            message: "Unauthorized",
            status: 401,
            data: null,
        });
    }

    try {
        const auth = await refreshAuthToken(refresh_token);

        setCookie({ res }, APP_COOKIES_ACCESS, auth.access_token, getCookieSetOptions(auth.expires_in));

        return res.status(200).json({
            message: "Authorized",
            status: 200,
            data: { access_token: auth.access_token },
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: "Error trying to refresh access token",
            status: 500,
            data: null,
        });
    }
}
