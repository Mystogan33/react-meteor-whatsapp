import React from 'react';
import StyledLeftStatus from '../elements/StyledStatus';
import StyledAvatar from '../elements/StyledAvatar';
import FontAwesome from 'react-fontawesome';

const Status = () => {
  return (
    <StyledLeftStatus color="blue">
      <StyledAvatar>
        <FontAwesome name="bell-slash" size="2x" className="icon--color" />
      </StyledAvatar>
      <div className="status--textContainer">
        <div className="text--big">
          Être Averti(e) de nouveaux messages.
        </div>
        <span className="text--small">
          Afficher les notifications sur le bureau >
        </span>
      </div>
    </StyledLeftStatus>
  )
};

export default Status;