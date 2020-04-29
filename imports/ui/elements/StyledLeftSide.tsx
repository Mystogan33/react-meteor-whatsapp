import styled from 'styled-components';

const StyledLeftSide = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #F7F7F7;

    .LS--header {
        display: flex;
        flex-direction: column;
        background: #00BFA5;
        width: calc(100% - 4.6rem);
        height: auto;
        padding: 4.9rem 2.3rem;
        padding-bottom: 0rem;
    }

    .LS--header__line {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: inherit;
        color: white;
        font-size: 1.9rem;
        height: 5.9rem;
    }

    .LS--header__icon {
        margin-right: 2.9rem;
        cursor: pointer;
    }

    .LS--avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin: 2.8rem 0rem;
    }
    
    .LS--desc {
        background: inherit;
        text-align: justify;
        padding: 1rem 3rem;
        padding-bottom: 1.9rem;
        font-size: 1.4rem;
        height: 4rem;
        width: calc(100% - 6rem);
        color: #929FA6;
    }
`

export default StyledLeftSide;