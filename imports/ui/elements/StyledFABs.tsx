import styled, { css } from 'styled-components';

const StyledFABs = styled.div`
    display: none;
    position: fixed;
    top: 6.5rem;
    right: 5.5rem;
    z-index: 100;

    ${props => props.fabVisible && css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `}

    input[type=file] {
        display: none;
    }

    .fab {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1.5rem;
        cursor: pointer;
        width: 5.1rem;
        height: 5.1rem;
        border-radius: 50%;
        box-shadow: 0 0.1rem 0.2rem rgba(0,0,0,.17), 0 0.6rem 0.8rem rgba(0,0,0,0.29);
    }
    .fab--icon {
        font-size: 2rem;
        color: white;
    }
`

export default StyledFABs;