import React, { useState, ChangeEvent } from 'react';
import StyledLSForm from '../elements/StyledLSForm';
import FontAwesome from 'react-fontawesome';
import { Meteor } from 'meteor/meteor';

interface LSFormProps {
  type: any;
};

const LSForm = ({ type }: LSFormProps) => {
  const [editable, setEditable] = useState(false);
  const value = type === "actu" ? Meteor.user()?.profile.actu : Meteor.user()?.username;
  const [state, setState] = useState(value);

  const handleChange = ({ target: { value }}: ChangeEvent<HTMLInputElement>) => {
    setState(value);
    const userId = Meteor.userId();

    if(userId) {
      if(type === "actu") Meteor.users.update({ _id: userId }, { $set: { "profile.actu": value } });
      else Meteor.call('user.username', Meteor.userId(), value);
    }
  };

  return (
    <StyledLSForm>
      <span className="LSForm--title">
        {type === "actu" ? "Actu": "Votre nom" }
      </span>
      <div className="LSForm--container">
        <input 
          readOnly={!editable} 
          className="LSForm--input __border"
          value={state}
          onChange={handleChange}
        />
        <FontAwesome 
          className="LSForm--icon" 
          name={editable ? "check" : "pen"}
          onClick={() => setEditable(!editable)} />
      </div>
    </StyledLSForm>
  );
};

export default LSForm;