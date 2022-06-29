import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import Link, { LinkProps } from "next/link";
import { hover, transition } from "@css/helper";

const ButtonWrapper = styled.button`
    display: flex;
    align-items: center;
    padding: 1.25rem 2rem;
    font-weight: bold;
    font-size: 2rem;
    border-radius: ${p => p.theme.radius};
    background-color: ${p => p.theme.white};
    color: ${p => p.theme.black};
    ${transition("color, background-color", "0.2s")};

    ${p => hover`
        background-color: ${p.theme.primary};
        color: ${p.theme.white};
    `};
`;

interface NextLinkProps extends Omit<LinkProps, "href" | "passHref"> {
    action: string;
    useAnchorElement?: boolean;
}

interface HTMLButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    action: () => void;
}

type ButtonProps = HTMLButtonProps | NextLinkProps;

const isButton = (props: ButtonProps): props is HTMLButtonProps => {
    return typeof props.action === "function";
};

const isLink = (props: ButtonProps): props is NextLinkProps => {
    return typeof props.action !== "function";
};

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ children, ...props }) => {
    if (isButton(props)) {
        return (
            <ButtonWrapper {...props} onClick={props.action}>
                {children}
            </ButtonWrapper>
        );
    } else if (isLink(props)) {
        return props.useAnchorElement ? (
            <ButtonWrapper as="a" href={props.action}>
                {children}
            </ButtonWrapper>
        ) : (
            <Link {...props} href={props.action} passHref>
                <ButtonWrapper as="a">{children}</ButtonWrapper>
            </Link>
        );
    }

    return null;
};
