import { NextRequest, userAgent } from "next/server";

const SUPPORTED_BROWSERS = ["chrome", "firefox", "edge"];

export const isSupportedBrowser = (browserName?: string) => {
    return !!browserName && SUPPORTED_BROWSERS.includes(browserName.toLowerCase());
};

export const isMobile = ({ type }: { type?: string }) => {
    return "mobile" === type || "tablet" === type;
};

export const isBrowserCompatible = (req: NextRequest): boolean => {
    const ua = userAgent(req);
    return !!ua && !isMobile(ua.device) && isSupportedBrowser(ua.browser.name);
};
