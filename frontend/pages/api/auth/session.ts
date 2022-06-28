import { NextApiRequest, NextApiResponse } from "next";
import { accessTokenFromCookies, APP_COOKIES_ACCESS, APP_COOKIES_AUTH, COOKIES_DEL_OPTIONS } from "@lib/cookie";
import { Api } from "@type/api";
import { setCookie } from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Api.SessionResponse>) {
    const access_token = accessTokenFromCookies(req.cookies);

    if (access_token) {
        return res.status(200).json({
            message: "Authorized",
            status: 200,
            data: { access_token },
        });
    } else {
        setCookie({ res }, APP_COOKIES_AUTH, "", COOKIES_DEL_OPTIONS);
        setCookie({ res }, APP_COOKIES_ACCESS, "", COOKIES_DEL_OPTIONS);
        return res.status(401).json({
            message: "Unauthorized",
            status: 401,
            data: null,
        });
    }
}
