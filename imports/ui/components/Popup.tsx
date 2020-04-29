import React from 'react';
import StyledPopup from '../elements/StyledPopup';

interface PopupProps {
  title: string;
  onCancel: any;
  onDelete: any;
};

const Popup = ({ title, onCancel, onDelete }: PopupProps) => {
  return (
    <StyledPopup>
      <div className="popup">
        <div className="popup--title">{title}</div>
        <div className="popup--button" onClick={onCancel}>Annuler</div>
        <div className="popup--button" onClick={onDelete}>Supprimer</div>
      </div>
    </StyledPopup>
  );
};

export default Popup;