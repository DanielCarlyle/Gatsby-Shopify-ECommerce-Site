import React from 'react';
import Image from 'gatsby-image';
import { ImageGalleryWrapper } from './styles';
import { ImageThumbnail } from './ImageThumbnail';

export function ImageGallery( {images}) {
    return (
      <ImageGalleryWrapper>
      <div>
      <Image fluid={images[0].localFile.childImageSharp.fluid} />
      </div>
      <div>
      {images.map((image) => {
        return (
          <ImageThumbnail
          key={image.id}
          image={image.localFile.childImageSharp.fluid}
          />
        );
      })}
      </div>
      </ImageGalleryWrapper>
    );
}
