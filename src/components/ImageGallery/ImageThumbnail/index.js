import React from 'react';
import Image from 'gatsby-image';
import { ImageThumbnailWrapper } from './styles';

export default function ImageThumbnail( {isActive, onClick, image }) {
    return (
      <ImageThumbnailWrapper
         onClick={() =>
           {console.log('CLICK');
         }}
      >
      <Image fluid={image} />
      </ImageThumbnailWrapper >
    );
}
