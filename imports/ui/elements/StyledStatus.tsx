import styled, { css } from 'styled-components';

const StyledLeftStatus = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: ${ ({theme}) => theme.leftStatus.color.bgOrange};
    width: calc(100% - 2.6rem);
    height: calc(16% - 2.4rem);
    padding: 1.2rem 1.3rem;
    cursor: pointer;

    ${({color})=> color === "blue" && css`
        background: ${({theme}) => theme.leftStatus.color.bgBlue};
    `}

    .status--textContainer {
        padding-left: 1.3rem;
    }
    .text--big {
        color: ${ ({
        theme}) => theme.leftStatus.color.textGrey};
        font-size: 1.6rem;
        line-height: 2.1rem;
        margin-bottom: 0.2rem;
    }
    .text--small {
        color: ${ ({
            theme}) => theme.leftStatus.color.spanGrey};
        font-size: 1.4rem;
        &:hover {
            text-decoration: underline;
        }
    }
    .icon--color {
        color: ${ ({theme}) => theme.leftStatus.color.bgBlue};
    }
`;

export default StyledLeftStatus;