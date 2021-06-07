import React, { useEffect, useState } from "react";
import { Spinner } from "./Spinner";

interface LoadingProps {
    condition: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ condition, children }) => {
    const [loaded, setLoaded] = useState<boolean | null>(null);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (!condition) {
            timeout = setTimeout(() => {
                setLoaded(false);
            }, 1000);
        } else {
            setLoaded(true);
        }

        return () => clearTimeout(timeout);
    }, [condition]);

    if (false === loaded) return <Spinner />;

    if (true === loaded) return <React.Fragment>{children}</React.Fragment>;

    return null;
};
