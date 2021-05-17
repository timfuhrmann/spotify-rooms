import styled from "styled-components";

export const Content = styled.div<{ breakOnMobile?: boolean }>`
    ${p =>
        !p.breakOnMobile &&
        `
            margin: 0 2.2rem;
            width: calc(100% - 4.4rem);
    `}

    @media ${p => p.theme.bp.l} {
        max-width: 120rem;
        width: calc(100% - 20rem);
        margin: 0 auto;
    } ;
`;

type ColumnsRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const Columns = styled.div<{ columns: ColumnsRange }>`
    flex: 1 1 ${p => 100 / p.columns}%;
    max-width: ${p => 100 / p.columns}%;
`;
