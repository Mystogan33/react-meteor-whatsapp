import styled, { css } from 'styled-components';

const StyledChatItem = styled.div<any>`
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    align-items: center;
    width: calc(100% - 3rem);
    height: 7.5rem;
    cursor: pointer;
    padding: 0 1.5rem;
    background: ${({theme}) => theme.chatItem.color.backgroundNormal};
    &:hover {
      background: ${({theme}) => theme.chatItem.color.backgroundActive};
    }
    ${({active}) => active && css`
      background: ${({theme}) => theme.chatItem.color.backgroundActive};
    `}

    .chat--contentContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 1.5rem;
        border-bottom: ${ ({
            theme}) => '0.1rem solid '+theme.chatItem.color.borderBottom};
        width: 85%;
        height: 100%;
    }
    .content--line1 {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        line-height: normal;
        margin-bottom: 0.3rem;
    }
    .content--line1__title {
        font-weight: 600;
        font-size: 1.6rem;
        text-align: left;
    }
    .content--line1__date {
        font-size: 1.2rem;
        color: ${ ({theme}) => theme.chatItem.color.date};
        text-align: right;
        margin-top: 0.3rem;
        margin-left: 0.6rem;
    }
    .content--message {
        font-size: 1.4rem;
        color: ${ ({theme}) => theme.chatItem.color.message};
        overflow: hidden;
        white-space: nowrap;
    }
    .chat--badge {
        background: ${({theme}) => theme.chatItem.color.bgGreen};
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
        text-align: right;
        margin-left: 2rem;
        padding: 0 1px 1px 0;
    }
` 

export default StyledChatItem;