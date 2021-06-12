import { NextApiRequest, NextApiResponse } from "next";
import { APP_COOKIES_ACCESS, APP_COOKIES_AUTH, COOKIES_SET_OPTIONS } from "../../app/lib/api/cookies";
import { refreshAccessToken } from "../../app/lib/api/auth";
import { Api } from "../../app/types/api";
import { setCookie } from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse<Api.RefreshType>) => {
    const cookie = req.cookies[APP_COOKIES_AUTH];

    if (!cookie) {
        return;
    }

    try {
        const json = JSON.parse(cookie);
        const auth = await refreshAccessToken(json.refresh_token);

        setCookie({ res }, APP_COOKIES_ACCESS, auth.access_token, COOKIES_SET_OPTIONS(auth.expires_in));

        res.status(200).json({
            message: "Successfully fetched login url",
            status: 200,
            data: { access_token: auth.access_token },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error trying to refresh access token",
            status: 500,
            data: null,
        });
    }
};
