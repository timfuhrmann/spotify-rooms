import { NextApiRequest, NextApiResponse } from "next";
import { accessTokenFromCookies } from "@lib/cookie";
import { Api } from "@type/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Api.SessionResponse>) {
    const access_token = accessTokenFromCookies(req.cookies);

    if (access_token) {
        return res.status(200).json({
            message: "Authorized",
            status: 200,
            data: { access_token },
        });
    } else {
        return res.status(401).json({
            message: "Unauthorized",
            status: 401,
            data: null,
        });
    }
}
