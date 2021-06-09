import { NextApiRequest, NextApiResponse } from "next";
import { APP_COOKIES, COOKIES_SET_OPTIONS } from "../../app/lib/util/api/Cookies";
import { refreshAccessToken } from "../../app/lib/api/auth";
import { Api } from "../../app/types/api";
import { setCookie } from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse<Api.RefreshType>) => {
    const appCookie = req.cookies[APP_COOKIES];

    if (!appCookie) {
        return;
    }

    try {
        const json = JSON.parse(appCookie);
        const auth = await refreshAccessToken(json["refresh_token"]);

        const obj = { ...json, ...auth };
        setCookie({ res }, APP_COOKIES, JSON.stringify(auth), COOKIES_SET_OPTIONS);

        res.status(200).json({
            message: "Successfully fetched login url",
            status: 200,
            data: { access_token: obj["access_token"] },
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
