import React from 'react';
import { Message } from '/imports/api/interfaces/chat.interface';
import StyledMessageImage from '../elements/StyledMessageImage';
import Moment from 'react-moment';
import FontAwesome from 'react-fontawesome';

interface MessageImageProps extends Message {
  mine: boolean;
};

const MessageImage = ({ mine, content, createdAt }: MessageImageProps) => {

  const renderImage = () => {
      if(!mine) {
        return (
          <>
            <img className="image" src={content} alt="_img" />
            <div className="image--overlay">
              <div className="detailsContainer__date">
                <div className="image--date">
                  <Moment format="HH:mm">
                    {createdAt}
                  </Moment>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        return (
          <>
            <img className="image" src={content} alt="_img" />
            <div className="image--overlay">
              <div className="detailsContainer__date">
                <div className="image--date">
                  <Moment format="HH:mm">
                    {createdAt}
                  </Moment>
                </div>
                <FontAwesome style={{color: "white"}} name="check-double" />
              </div>
            </div>
          </>
        )
      }
  };

  return (
    <StyledMessageImage>
      {renderImage()}
    </StyledMessageImage>
  );
};

export default MessageImage;