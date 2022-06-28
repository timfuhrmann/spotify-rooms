import { NextApiRequest, NextApiResponse } from "next";
import { Api } from "@type/api";
import { getSpotifyLoginUrl } from "@lib/api/auth";

export default async function handler(_: NextApiRequest, res: NextApiResponse<Api.LoginResponse>) {
    return res.redirect(getSpotifyLoginUrl());
}
