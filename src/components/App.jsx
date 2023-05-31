import React, { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';

import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { LoadMore } from './LoadMore/LoadMore';
import { getImages } from 'Api';
import Modal from './modal/Modal';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  // const [modalAlt, setModalAlt] = useState('');

  const updateQuery = value => {
    setQuery(value.query);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!query) {
      return;
    }
    const getData = async () => {
      try {
        setIsLoading(true);
        const images = await getImages(page, query);
        setImages(state => [...state, ...images.images]);
        setHits(images.total);
        setTotalHits(images.totalHits);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [page, query]);
  const loadMore = async () => {
    setPage(state => state + 1);
  };

  const onOpenModal = evt => {
    setLargeImageURL(evt.target.dataset.source);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  return (
    <div
      style={{
        width: '1240px',
        padding: '0 20px',
        margin: '0 auto',
      }}
    >
      <Searchbar updateQuery={updateQuery} />
      {images.length === 0 && !isLoading && (
        <p>There`re no images yet. Please enter the search category!</p>
      )}
      {images.length !== 0 && (
        <>
          <ImageGallery images={images} error={error} onClick={onOpenModal} />{' '}
        </>
      )}
      {hits >= 12 && images.length !== totalHits && !isLoading && (
        <LoadMore click={loadMore} />
      )}

      {isLoading && (
        <ColorRing
          visible={true}
          height="180"
          width="180"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      )}
      {showModal && (
        <Modal largeImageURL={largeImageURL} onToggleModal={toggleModal} />
      )}
    </div>
  );
}
export default App;
