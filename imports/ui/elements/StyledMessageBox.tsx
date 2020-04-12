import styled from 'styled-components';

const imageUrl:string = './images/bg-whatsapp-message.png';

const StyledMessageBox = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 14.8rem);
    height: calc(88% - 2rem);
    padding: 1rem 7.4rem;
    overflow-y: auto;
    background-image: url(${imageUrl});

    &::-webkit-scrollbar {
        width: 0.5rem;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 0.2rem;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
    .day--container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-bottom: 1.2rem;
    }
    .day--wrapper {
        background: ${({theme}) => theme.messageBox.color.dayWrapper};
        border-radius: 0.7rem;
        padding: 0.6rem 1.2rem;
        text-align: center;
        height: 2.2rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .day--span {
        color: ${({theme}) => theme.messageBox.color.dayspan};
        font-size: 1.25rem;
        text-transform: uppercase;
    }
    .messageContainer {
        display: flex;
        flex-direction: row;
        align-items:center;
    }
    .message {
        padding: 0.8rem;
        display: flex;
        flex-direction: row;
        align-items:center;
        font-size: 1.4rem;
        color: ${({theme}) => theme.messageBox.color.message};
        background: ${({theme}) => theme.messageBox.color.messageBackground};
        border-radius: 0.7rem;
        margin-bottom: 0.2rem;
        width: auto;
        max-width: 65%;
        position: relative;
    }
    .detailsContainer {
        font-size: 1.1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        position: relative;
        bottom: -0.7rem;
        right: -0.7rem;
        width: 5.5rem;
        margin-left: 5rem;
        color: ${({theme}) => theme.messageBox.color.detailsContainer}
    }
    .message--mine {
        background: ${({theme}) => theme.messageBox.color.messageMineBackground};
        margin-left: auto;
        align-items: flex-end;
    }
`

export default StyledMessageBox;

