import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { LogOut } from "../../../icons/LogOut";
import { useSpotify } from "../../../context/spotify/SpotifyContext";

const LogoutLink = styled.a`
    display: flex;
`;

const LogoutIcon = styled(LogOut)`
    width: 2.4rem;
    height: 2.4rem;
`;

export const Logout: React.FC = () => {
    const { authToken } = useSpotify();

    if (!authToken) return null;

    return (
        <Link href="/api/logout" passHref>
            <LogoutLink>
                <LogoutIcon />
            </LogoutLink>
        </Link>
    );
};
