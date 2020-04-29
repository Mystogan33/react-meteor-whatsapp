import styled, { css } from 'styled-components';

const StyledAvatar = styled.div<any>`
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.avatar.color.background};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${({ large }) => large && css`
    width: 4.9rem;
    height: 4.9rem;
    border-radius: 2.45rem;
  `}

  ${({ big }) => big && css`
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
  `}

  .avatar--img {
    width: 100%;
    height: 100%;
  }

  .avatar--overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    font-size: 2.4rem;
  }

  .overlay--icon {
    margin-bottom: 1.3rem;
  }

  .overlay--text {
    font-size: 1.4rem;
    font-weight: bold;
  }

  input[type=file] {
    display: none;
  }

`;

export default StyledAvatar;