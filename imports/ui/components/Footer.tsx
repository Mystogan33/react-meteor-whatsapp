import React, { useState } from 'react';
import FontAwesome from 'react-fontawesome';
import StyledFooter from '../elements/StyledFooter';
import { IHandleFooterChange } from '/imports/api/interfaces/functions.interface';

const Footer = () => {

  const [inputValue, setInputValue] = useState("");
  const [iconName, setIconName] = useState("microphone");

  const handleChange: IHandleFooterChange = ({ target: { value } }) => {
    setInputValue(value);
    const name = value !== "" ? "paper-plane": "microphone";
    setIconName(name);
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
      <FontAwesome className="iconFooter" name={iconName} />
    </StyledFooter>
  );
};

export default Footer;