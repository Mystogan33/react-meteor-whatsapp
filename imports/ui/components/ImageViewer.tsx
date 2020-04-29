import React from 'react';
import StyledImageViewer from "../elements/StyledImageViewer";
import FontAwesome from "react-fontawesome";

interface ImageViewerProps {
  imageUrl: string;
  onClose: () => void;
};

const ImageViewer = ({ imageUrl, onClose }: ImageViewerProps) => {
  return (
    <StyledImageViewer>
      <div className="IV--close">
        <FontAwesome 
          className="IV--icon"
          name="times"
          onClick={onClose}
        />
      </div>
      <div className="IV--imageContainer">
        <img src={imageUrl} alt="_selectedImage" className="IV--image"/>
      </div>
    </StyledImageViewer>
  )
};

export default ImageViewer;