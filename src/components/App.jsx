import { Component } from 'react';

import '../styles/styles.scss';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import LoadMoreBtn from './Button/Button';
import Modal from './Modal/Modal';
import Err from './Error/Err';
import { key } from 'key/api';

export class App extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    q: '',
    isLoading: false,
    modalItem: null,
    isModalOpen: false,
    isError: false,
    total: null,
    data: [],
  };

  componentDidMount() {
    if (!this.state.data.length) {
      this.imageSearch({ q: '', page: 1 });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  ModalOpen = (modalItem = null) => {
    this.setState(prev => ({ isModalOpen: !prev.isModalOpen, modalItem }));
  };

  onSubmit = input => {
    this.imageSearch({ q: input, page: 1 });
    this.setState({ data: [] });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  loadMoreBtn = () => {
    const { q, page } = this.state;
    this.imageSearch({ q: q, page: page + 1 });
  };
  imageSearch({ q, page }) {
    this.setState({ isLoading: true, isError: false, page, q });

    key({ q, page })
      .then(data => {
        if (!data.hits.length && q) {
          throw new Error('no images on search :' + q);
        }
        this.setState(prev => ({
          data: [...prev.data, ...data.hits],
          total: data.totalHits,
        }));
      })
      .catch(err => {
        console.log(err);
        this.setState({ isError: true, error: err });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  render() {
    const { data, isLoading, isError, error, total, isModalOpen, modalItem } =
      this.state;
    const loadMoreBtn = total > data.length && data.length > 0;
    return (
      <>
        <SearchBar onSubmit={this.onSubmit} />
        {isError && <Err message={error.message} />}
        {isLoading && <Loader />}
        {!isError && (
          
          <>
          {}
            <ImageGallery openModal={this.ModalOpen} items={data} />

            {loadMoreBtn && <LoadMoreBtn handleClick={this.loadMoreBtn} />}

            {isModalOpen && (
              <Modal modalItem={modalItem} closeModal={this.ModalOpen} />
            )}
          </>
        )}
      </>
    );
  }
}

export default App;
