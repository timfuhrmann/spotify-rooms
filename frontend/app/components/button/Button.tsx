import React, { PropsWithChildren } from "react";
import styled, { css } from "styled-components";
import Link, { LinkProps as NextLinkProps } from "next/link";
import { hover, transition } from "@css/helper";

const ButtonStyles = css`
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

const ButtonWrapper = styled.button`
    ${ButtonStyles};
`;

const LinkWrapper = styled.a`
    ${ButtonStyles};
`;

interface HTMLLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    as: "a";
    action: URL | string;
    nextLinkProps?: Omit<NextLinkProps, "href" | "passHref">;
}

interface HTMLButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    as: "button";
    action: (e: React.MouseEvent) => void;
}

type ButtonProps = HTMLLinkProps | HTMLButtonProps;

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ children, ...props }) => {
    switch (props.as) {
        case "button": {
            const { as, action, ...rest } = props;

            return (
                <ButtonWrapper onClick={action} {...rest}>
                    {children}
                </ButtonWrapper>
            );
        }
        default: {
            const { as, action, nextLinkProps, ...rest } = props;

            return (
                <Link href={action} {...nextLinkProps} passHref>
                    <LinkWrapper {...rest}>{children}</LinkWrapper>
                </Link>
            );
        }
    }
};
