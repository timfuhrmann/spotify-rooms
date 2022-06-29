import { NextApiRequest, NextApiResponse } from "next";
import { APP_COOKIES_ACCESS, APP_COOKIES_REFRESH, COOKIES_DEL_OPTIONS } from "@lib/cookie";
import { setCookie } from "nookies";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
    setCookie({ res }, APP_COOKIES_REFRESH, "", COOKIES_DEL_OPTIONS);
    setCookie({ res }, APP_COOKIES_ACCESS, "", COOKIES_DEL_OPTIONS);
    res.redirect("/");
}
