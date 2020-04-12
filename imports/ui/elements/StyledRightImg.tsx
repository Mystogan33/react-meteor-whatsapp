import styled, {css} from 'styled-components';

const StyledRightImg = styled.div<any> `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background: ${({theme}) => theme.rightImg.color.bgGrey};

    ${({right}) => right && css`
      width: 100%;
      height: 100%;
    `}

    .rightImg--image {
      width: 25rem;
      height: 25rem;
      margin-bottom: 2.8rem;
    }
    .rightImg--title {
      font-size: 3.2rem;
      margin-bottom: 1.8rem;
      color: ${({theme}) => theme.rightImg.color.darkGrey};
      font-weight: 300;
    }
    .rightImg--div {
      margin-bottom: 3rem;
      width: 42rem;
    }
    .rightImg--p {
      text-align: center;
      color: ${({theme}) => theme.rightImg.color.mediumGrey};
      font-size: 1.4rem;
      line-height: 2rem;
      margin-bottom: 3.4rem;
    }
    .rightImg--divider {
      width: 100%;
      height: 0.2rem;
      background: ${({theme}) => theme.rightImg.color.lightGrey};
      margin-bottom: 0.1rem;
    }
`; 

export default StyledRightImg;