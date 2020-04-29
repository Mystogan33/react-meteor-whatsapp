import React from 'react';
import StyledLeftSide from '../elements/StyledLeftSide';

interface LeftSideProps {
  children: any;
};

const LeftSide = ({ children }: LeftSideProps) => {
  return (
    <StyledLeftSide>
      {children}
    </StyledLeftSide>
  );
};

export default LeftSide;

