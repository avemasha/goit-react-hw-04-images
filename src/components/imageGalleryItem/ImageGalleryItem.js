import PropTypes from 'prop-types';
export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onClick,
}) => {
  return (
    <li className="imageGalleryItem">
      <img
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
        onClick={onClick}
        className="imageGalleryItem-image"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
