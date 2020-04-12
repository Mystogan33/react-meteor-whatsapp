import React from 'react';
import StyledHeader from '../elements/StyledHeader';
import FontAwesome from 'react-fontawesome';

interface HeaderProps {
  icons: string[];
  iconClass: string;
  iconsWidthSmall?: any;
  children: any;
};

const Header = ({ icons, iconClass, iconsWidthSmall, children }: HeaderProps) => {

  const renderIcons = () => {
    return icons.map((icon, i) => <FontAwesome key={i} className={iconClass} name={icon} />);
  };

  return (
    <StyledHeader>
      {children}
      <div className={iconsWidthSmall ? "icons--left small" : "icons--left"}>
        {renderIcons()}
      </div>
    </StyledHeader>
  );
};

export default Header;