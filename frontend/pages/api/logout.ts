import { NextApiRequest, NextApiResponse } from "next";
import { APP_COOKIES } from "../../app/lib/util/api/Cookies";
import { destroyCookie } from "nookies";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        destroyCookie({ res }, APP_COOKIES, {
            httpOnly: true,
            path: "/",
        });
        res.send("Successfully logged out.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error trying to logout.");
    }
};
