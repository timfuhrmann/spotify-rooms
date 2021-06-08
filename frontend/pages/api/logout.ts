import { NextApiRequest, NextApiResponse } from "next";
import { APP_COOKIES, getExpiredCookieDate } from "../../app/lib/util/api/Cookies";
import { setCookie } from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    setCookie({ res }, APP_COOKIES, null, {
        httpOnly: true,
        path: "/",
        expires: getExpiredCookieDate(),
    });
    res.send("Successfully logged out.");
};
