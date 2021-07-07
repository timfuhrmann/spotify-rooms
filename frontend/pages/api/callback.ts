import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";
import { APP_COOKIES_ACCESS, APP_COOKIES_AUTH, COOKIES_SET_OPTIONS } from "../../app/lib/api/cookies";
import { getSpotifyAccessToken } from "../../app/lib/api/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.query;

    if (!code || "string" !== typeof code) {
        return res.status(500).send("Error trying to authenticate.");
    }

    try {
        const auth = await getSpotifyAccessToken(code);

        if (auth.access_token) {
            setCookie({ res }, APP_COOKIES_ACCESS, auth.access_token, COOKIES_SET_OPTIONS(auth.expires_in));
            setCookie({ res }, APP_COOKIES_AUTH, JSON.stringify(auth), COOKIES_SET_OPTIONS());

            return res.redirect("/dashboard");
        } else {
            res.status(500).send("Error trying to authenticate.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error trying to authenticate.");
    }
}
