import { NextRequest, userAgent } from "next/server";

export const isIE = (browserName?: string) => {
    return browserName && browserName.toLowerCase() === "Internet Explorer";
};

export const isSafari = (browserName?: string) => {
    return browserName && browserName.toLowerCase() === "safari";
};

export const isMobile = ({ type }: { type?: string }) => {
    return "mobile" === type || "tablet" === type;
};

export const isBrowserCompatible = (req: NextRequest): boolean => {
    const ua = userAgent(req);
    return !!ua && !isMobile(ua.device) && !isSafari(ua.browser.name) && !isIE(ua.browser.name);
};
