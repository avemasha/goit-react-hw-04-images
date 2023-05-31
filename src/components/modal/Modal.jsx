import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

function Modal({ largeImageURL, onToggleModal }) {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onToggleModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToggleModal]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onToggleModal();
    }
  };

  return createPortal(
    <div onClick={handleBackdropClick} className="overlay">
      <div>
        <img src={largeImageURL} alt={''} className="modal" />
      </div>
    </div>,
    document.querySelector('#modal-root')
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,

  onToggleModal: PropTypes.func.isRequired,
};

export default Modal;
