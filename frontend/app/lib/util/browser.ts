import Bowser from "bowser";
import { GetServerSidePropsContext } from "next";
import exp from "constants";

export const isIE = (userAgent: string) => {
    const browser = Bowser.getParser(userAgent);
    return browser.isBrowser("internet-explorer");
};

export const isSafari = (userAgent: string) => {
    const browser = Bowser.getParser(userAgent);
    return browser.isBrowser("safari");
};

export const isMobile = (userAgent: string) => {
    const browser = Bowser.getParser(userAgent);
    const { type } = browser.getPlatform();
    return "mobile" === type || "tablet" === type;
};

export const checkBrowserCompatibility = (userAgent: string): boolean => {
    return userAgent && !isMobile(userAgent) && !isSafari(userAgent) && !isIE(userAgent);
};
