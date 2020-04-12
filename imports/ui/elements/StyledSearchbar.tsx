import styled from 'styled-components';

const StyledSearchbar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: ${({theme}) => theme.searchBar.color.background};
    width: 100%;
    height: 7%;
    position: relative;

    .searchbar--label {
        background: ${({theme}) => theme.searchBar.color.labelBackground};
        position: absolute;
        top: 0.7rem;
        left: 1.2rem;
        right: 1.4rem;
        border-radius: 1.8rem;
        padding-left: 2.5rem;
        padding-right: 2.2rem;
        height: 3.5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .searchbar--icon {
        color: ${({theme}) => theme.searchBar.color.icon};
        font-size: 1.3rem;
        margin-right: 1.5rem;
    }
    .searchbar--input {
        font-size: 1.5rem;
        font-weight: 400;
        line-height: 2rem;
        min-height: 2rem;
        outline: none;
        width: 100%;
        user-select: text;
        z-index: 1;
        border: none;
        color: ${({theme}) => theme.searchBar.color.input};
        &::placeholder {
            color: ${({theme}) => theme.searchBar.color.placeholder};
            opacity: 1;
            font-size: 1.4rem;
        }
    }
`

export default StyledSearchbar;