import React from 'react';
import StyledFABs from '../elements/StyledFABs';
import FABItem from './FABItem';
import { IHandleFabInputChange } from '/imports/api/interfaces/functions.interface';

interface FABsProps {
  fabVisible: boolean;
  handleFabClick: () => void;
  handleFabInputChange: IHandleFabInputChange
};

const FABs = ({ fabVisible, handleFabClick, handleFabInputChange }: FABsProps) => {
  return (
    <StyledFABs fabVisible={fabVisible}>
      <FABItem onClick={handleFabClick} bg="violet" iconName="image">
        <input type="file" id="fileUpload" accept="image/*" onChange={handleFabInputChange} />
      </FABItem>
      <FABItem bg="orange" iconName="camera" />
      <FABItem bg="blue" iconName="file" />
      <FABItem bg="lightblue" iconName="user" />
    </StyledFABs>
  )
};

export default FABs;