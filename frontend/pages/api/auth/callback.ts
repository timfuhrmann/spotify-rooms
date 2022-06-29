import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";
import { APP_COOKIES_ACCESS, APP_COOKIES_REFRESH, getCookieSetOptions } from "@lib/cookie";
import { getSpotifyAccessToken } from "@lib/api/server/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.query;

    if (!code || "string" !== typeof code) {
        return res.status(400).end();
    }

    try {
        const auth = await getSpotifyAccessToken(code);

        if (auth.access_token) {
            setCookie({ res }, APP_COOKIES_ACCESS, auth.access_token, getCookieSetOptions(auth.expires_in));
            setCookie({ res }, APP_COOKIES_REFRESH, auth.refresh_token, getCookieSetOptions());

            return res.redirect("/dashboard");
        } else {
            res.status(500).send("Error trying to authenticate.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error trying to authenticate.");
    }
}
