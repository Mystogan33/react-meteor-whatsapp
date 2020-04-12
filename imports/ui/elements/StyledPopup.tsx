import styled from 'styled-components';

const StyledPopup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .popup {
        display: flex;
        overflow: hidden;
        width: 25%;
        flex-direction: column;
        background-color: #fff;
        border-radius: 0.3rem;
        box-shadow: 0 1.7rem 5rem 0 rgba(0,0,0,.19), 0 1.2rem 1.5rem 0 rgba(0,0,0,.24);
        padding: 2.2rem 2.4rem 2rem;
    }
    .popup--title {
        font-size: 2rem;
        font-weight: 400;
        margin-bottom: 2rem;
        text-align: left;
    }
    .popup--button {
        text-align: center;
        padding: 1rem 2.4rem;
        border-radius: 3;
        color: #07bc4c;
        width: 7rem;
        margin-left: auto;
        margin-bottom: 0.5rem;
        cursor: pointer;
        text-transform: uppercase;
        position: relative;
        font-size: 1.4rem;
        transition: box-shadow .18s ease-out,background .18s ease-out,color .18s ease-out;
        &:hover {
            background-color: #fff;
            box-shadow: 0 0.1rem 0.1rem 0 rgba(0,0,0,.06), 0 0.2rem 0.5rem 0 rgba(0,0,0,.2);
        }
    }
`

export default StyledPopup;