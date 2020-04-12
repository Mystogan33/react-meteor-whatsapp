import styled, { css } from 'styled-components';

const StyledAvatar = styled.div<any>`
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  position: relative;
  overflow: hidden;
  background: ${({theme}) => theme.avatar.color.background};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${({large}) => large && css`
    width: 4.9rem;
    height: 4.9rem;
    border-radius: 2.45rem;
  `}

  .avatar--img {
    width: 100%;
    height: 100%;
  }
`;

export default StyledAvatar;