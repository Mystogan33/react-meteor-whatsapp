import styled from 'styled-components';

const StyledBigOverlay = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background: hsla(0,0%,100%,.85);
    z-index: 2000000000;
`

export default StyledBigOverlay;