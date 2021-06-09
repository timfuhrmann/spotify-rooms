import { NextApiRequest, NextApiResponse } from "next";
import { APP_COOKIES, COOKIES_DEL_OPTIONS } from "../../app/lib/util/api/Cookies";
import { setCookie } from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    setCookie({ res }, APP_COOKIES, "", COOKIES_DEL_OPTIONS);
    res.send("Successfully logged out.");
};
