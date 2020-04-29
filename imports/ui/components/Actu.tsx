import React from 'react';
import StyledActu from '../elements/StyledActu';
import { UserProfile } from '/imports/api/interfaces/user.interface';

interface ActuProps extends UserProfile {};

const Actu = ({ actu, phone }: ActuProps) => {
  return (
    <StyledActu>
      <span className="actu--title">Actu et numéro de téléphone</span>
      <span className="actu--content">{actu}</span>
      <div className="actu--divider" />
      <span className="actu--phone">{phone}</span>
    </StyledActu>
  )
};

export default Actu;