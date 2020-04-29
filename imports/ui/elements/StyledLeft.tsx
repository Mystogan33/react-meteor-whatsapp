import styled, { css } from 'styled-components';

const StyledLeft = styled.div<any>`
    display: flex;
    flex-direction: column;
    width: 35%;
    height: 100%;
    border-right: ${ ({theme}) => '0.1rem solid '+theme.left.color.borderRight};
    ${ ({ OPVisible }) => OPVisible && css`
        width: 30%;
    `}
`;

export default StyledLeft;