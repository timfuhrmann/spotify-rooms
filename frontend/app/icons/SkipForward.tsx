import React from "react";

export const SkipForward = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}>
            <path d="M5 4l10 8-10 8V4zM19 5v14" />
        </svg>
    );
};
