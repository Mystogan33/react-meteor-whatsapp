import styled from 'styled-components';

import StyledChatList from './StyledChatList';

const StyledUsersList = styled(StyledChatList)`
    height: 80%;
    .letter {
        height: 7.2rem;
        font-size: 1.6rem;
        color: #009688;
        text-transform: uppercase;
        background: white;
        padding: 3rem 0 1.5rem 3.2rem;
    }
`

export default StyledUsersList;