import React, { FC } from 'react';
import StyledBigOverlay from '../elements/StyledBigOverlay';

interface BigOverlayProps {};

const BigOverlay: FC<BigOverlayProps> = ({ children }) => {
 return (
  <StyledBigOverlay>
    { children }
  </StyledBigOverlay>
 );
};

export default BigOverlay;