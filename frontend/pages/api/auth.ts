import { NextApiRequest, NextApiResponse } from "next";
import { Api } from "../../app/types/api";
import { getSpotifyLoginUrl } from "../../app/lib/api/backend";

export default async (req: NextApiRequest, res: NextApiResponse<Api.AuthType>) => {
    try {
        const { status, url } = await getSpotifyLoginUrl();

        if (200 === status && url) {
            res.status(200).json({
                message: "Successfully fetched login url.",
                status,
                data: { url },
            });
        } else {
            res.status(500).json({
                message: "Error trying to get login url.",
                status: 500,
                data: null,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error trying to get login url.",
            status: 500,
            data: null,
        });
    }
};
