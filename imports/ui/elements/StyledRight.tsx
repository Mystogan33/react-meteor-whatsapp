import styled, { css } from 'styled-components';

const StyledRight = styled.div<any>`
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 100%;

  ${ ({ OPVisible }) => OPVisible && css`
    width: 40%;
    border-radius: 0.1rem solid rgba(0, 0, 0, 0.2);
  `}
`;

export default StyledRight;