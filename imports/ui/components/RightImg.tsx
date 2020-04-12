import React from 'react';

import StyledRightImg from '../elements/StyledRightImg';

const RightImg = ({right, messageText, children}: any) => (
  <StyledRightImg right={right}>
    <img src="./images/whatsapp-bg-1.jpg" alt="_background" className="rightImg--image"/>
    <h3 className="rightImg--title">Gardez votre téléphone connecté</h3>
    <div className="rightImg--div">
      <p className="rightImg--p">{messageText}</p>
      <div className="rightImg--divider" />
    </div>
    {children}
  </StyledRightImg>
);

export default RightImg;