import React from 'react';
import FontAwesome from 'react-fontawesome';
import StyledModal from '../elements/StyledModal';
import { IHandleFooterSend } from '/imports/api/interfaces/functions.interface';
import { MessageType } from '/imports/api/interfaces/chat.interface';

interface ModalProps {
  selectedImage?: any;
  onClose: () => void;
  onUpload: IHandleFooterSend;
}

const Modal = ({ selectedImage, onClose, onUpload }: ModalProps) => {
  return (
    <StyledModal>
      <div className="modal--header">
        <FontAwesome className="modal--header__icon" size="2x" name="times" onClick={onClose} />
        <span className="modal--header__title">Aperçu</span>
      </div>
      <div className="modal--body">
        <img style={{width: "349px", height: "349px" }} alt="_apercu" src={selectedImage} />
        <div className="modal--body__fab" onClick={() => onUpload("", MessageType.IMAGE)}>
          <FontAwesome name="paper-plane" size="3x" />
        </div>
      </div>
      <div className="modal-footer">
        <div className="modal--footer__box">
          <img style={{width: "100%", height: "100%" }} alt="_apercu" src={selectedImage} />
        </div>
        <div className="modal--footer__box">
          <FontAwesome size="2x" name="plus" />
          <span>AJOUTER</span>
        </div>
      </div>
    </StyledModal>
  )
};

export default Modal;