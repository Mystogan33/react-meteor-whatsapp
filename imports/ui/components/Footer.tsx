import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import StyledFooter from '../elements/StyledFooter';
import { IHandleFooterChange, IHandleFooterSend } from '/imports/api/interfaces/functions.interface';

interface FooterProps {
  onSend: IHandleFooterSend;
};

const Footer = ({ onSend }: FooterProps) => {

  const [inputValue, setInputValue] = useState("");
  const [iconName, setIconName] = useState("microphone");

  const handleChange: IHandleFooterChange = ({ target: { value } }) => {
    setInputValue(value);
    const name = value !== "" ? "paper-plane": "microphone";
    setIconName(name);
  };

  const handleClick = () => {
    if(iconName === "microphone") return;
    onSend(inputValue);
    setInputValue('');
  };

  return (
    <StyledFooter>
      <FontAwesome className="iconFooter" name="smile" />
      <label className="message--label">
        <input 
          type="text"
          className="message--input"
          placeholder="Tapez un message"
          value={inputValue}
          onChange={handleChange}
        />
      </label>
      <FontAwesome className="iconFooter" name={iconName} onClick={handleClick} />
    </StyledFooter>
  );
};

export default Footer;