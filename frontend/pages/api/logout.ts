import { NextApiRequest, NextApiResponse } from "next";
import { APP_COOKIES } from "../../app/lib/util/api/Cookies";
import { destroyCookie } from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    destroyCookie({ res }, APP_COOKIES, {
        httpOnly: true,
        path: "/",
    });

    res.send("Successfully logged out.");
};
