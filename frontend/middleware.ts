import { NextRequest, NextResponse } from "next/server";
import { validateAuthentication } from "@lib/api/server";
import { isBrowserCompatible } from "@lib/browser";

const PUBLIC_FILE = /\.(.*)$/;

const unprotectedPages = ["/", "/sorry", "/legal"];

const shouldHandleRequest = (path: string): boolean => {
    return !PUBLIC_FILE.test(path) && !path.includes("/api/");
};

const shouldHandleAuthProtection = (path: string): boolean => {
    return !unprotectedPages.includes(path);
};

export default async function handler(req: NextRequest) {
    const url = req.nextUrl.clone();
    const res = NextResponse.next();

    if (shouldHandleRequest(url.pathname)) {
        const isValid = isBrowserCompatible(req);

        if (url.pathname !== "/sorry" && !isValid) {
            url.pathname = "/sorry";
            return NextResponse.redirect(url);
        } else if (!isValid) {
            return res;
        }

        const access_token = await validateAuthentication(req, res);

        if (shouldHandleAuthProtection(url.pathname) && !access_token) {
            url.pathname = "/";
            return NextResponse.redirect(url);
        } else if (!shouldHandleAuthProtection(url.pathname) && access_token) {
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }
    }

    return res;
}
