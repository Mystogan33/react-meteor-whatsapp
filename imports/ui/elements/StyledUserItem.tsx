import styled from 'styled-components';

import StyledChatItem from './StyledChatItem';

const StyledUserItem = styled(StyledChatItem)`
    .chat--contentContainer {
        border-bottom: none;
        position: relative;
    }
    .__divider {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 0.1rem;
        background: #f2f2f2;
    }
`

export default StyledUserItem;