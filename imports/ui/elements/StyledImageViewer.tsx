import styled from 'styled-components';

const StyledImageViewer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .IV--close {
        width: calc(100% - 2.6rem);
        height: calc(6rem - 2.6rem);
        padding: 1.3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 2rem;
    }
    .IV--icon {
        font-size: 2.5rem;
        color: black;
        cursor: pointer;
        margin-left: auto;
    }
    .IV--imageContainer {
        width: 55rem;
        height: 55rem;
        margin: 0 auto;
    }
    .IV--image {
        width: 100%;
        height: 100%;
    }
`

export default StyledImageViewer;