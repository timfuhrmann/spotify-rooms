import Bowser from "bowser";
import { GetServerSidePropsContext } from "next";

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

interface CheckBrowserData {
    unknown: boolean;
    invalid?: boolean;
}

const checkBrowser = (context: GetServerSidePropsContext): CheckBrowserData => {
    const ua = context.req.headers["user-agent"];

    if (!ua) {
        return {
            unknown: true,
        };
    }

    return {
        unknown: false,
        invalid: isMobile(ua) || isSafari(ua) || isIE(ua),
    };
};

export const validateBrowser = (context: GetServerSidePropsContext, props = {}) => {
    const { invalid } = checkBrowser(context);

    if (invalid) {
        return {
            redirect: {
                destination: "/sorry",
                permanent: false,
            },
        };
    } else {
        return {
            props,
        };
    }
};
