import styled, { css } from 'styled-components';

const StyledActuItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1.9rem 3rem;
    width: calc(100% - 6rem);
    height: calc(6rem - 3.8rem);
    cursor: pointer;
    font-size: 1.6rem;
    margin-bottom: 1rem;
    background: white;
    font-weight: 500;

    &:hover {
        background: #f5f5f5;
    }

    ${props => props.red && css`
        color: red;
        .AI--icon {
            color: #D70000 !important;
        }
    `}

    .AI--icon {
        color: rgba(0,0,0,0.3);
        margin-right: 3rem;
        font-size: 2rem;
    }

`

export default StyledActuItem;