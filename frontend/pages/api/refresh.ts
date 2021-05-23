import { NextApiRequest, NextApiResponse } from "next";
import { APP_COOKIES } from "../../app/lib/util/api/checkCookies";
import { refreshAccessToken } from "../../app/lib/api/auth";
import { setCookie } from "nookies";
import { getCookieDate } from "../../app/lib/util/api/getCookieDate";
import { Api } from "../../app/types/api";

export default async (req: NextApiRequest, res: NextApiResponse<Api.RefreshType>) => {
    const cookie = req.cookies[APP_COOKIES];

    if (!cookie) {
        return;
    }

    try {
        const json = JSON.parse(cookie);
        const auth = await refreshAccessToken(json["refresh_token"]);

        const obj = { ...json, ...auth, date: new Date() };
        setCookie({ res }, APP_COOKIES, JSON.stringify(obj), {
            httpOnly: true,
            path: "/",
            expires: getCookieDate(),
        });

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
