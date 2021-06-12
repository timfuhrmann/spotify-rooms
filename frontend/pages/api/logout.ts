import { NextApiRequest, NextApiResponse } from "next";
import { APP_COOKIES_ACCESS, APP_COOKIES_AUTH, COOKIES_DEL_OPTIONS } from "../../app/lib/api/cookies";
import { setCookie } from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    setCookie({ res }, APP_COOKIES_AUTH, "", COOKIES_DEL_OPTIONS);
    setCookie({ res }, APP_COOKIES_ACCESS, "", COOKIES_DEL_OPTIONS);
    res.send("Successfully logged out.");
};
