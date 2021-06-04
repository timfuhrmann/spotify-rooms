import { NextApiRequest, NextApiResponse } from "next";
import { APP_COOKIES } from "../../app/lib/util/api/checkCookies";
import { refreshAccessToken } from "../../app/lib/api/auth";
import { destroyCookie, setCookie } from "nookies";
import { getCookieDate } from "../../app/lib/util/api/getCookieDate";
import { Api } from "../../app/types/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    destroyCookie({ res }, APP_COOKIES, {
        httpOnly: true,
        path: "/",
    });

    res.status(200).send("Successfully logged out.");
};
