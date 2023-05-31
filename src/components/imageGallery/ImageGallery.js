import React from "react"
import PropTypes from 'prop-types'
import {nanoid} from 'nanoid'

import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onClick }) => {
    return (
      <ul className="imageGallery">
        {images.map(({ webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
            webformatURL={webformatURL}
              alt={tags}
              largeImageURL={largeImageURL}
              key={nanoid(4)}
              onClick={onClick}
            />
          );
        })}{' '}
      </ul>
    );
  };
  
  ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
  };