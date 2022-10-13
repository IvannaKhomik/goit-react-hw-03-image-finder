import { ImageGalleryItem } from '../ImageGalleryItem';
import { Component } from 'react';
import { Button } from '../Button';
import { Gallery, Error } from './ImageGallery.styled';
import { Loader } from '../Loader';
import { getImages } from '../../requests';

export default class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    const { page } = this.state;
    if (prevProps.query !== query) {
      this.setState({ status: 'pending', page: 1 });

      getImages(query)
        .then(res => {
          const data = res.hits;
          return this.setState({
            images: data,
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ status: 'pending' });

      console.log(page);

      getImages(query, page)
        .then(res => {
          const data = res.hits;

          return this.setState(prevState => {
            return {
              images: [...prevState.images, ...data],
              status: 'resolved',
            };
          });
        })
        //   return this.setState({ images: data, status: 'resolved' });
        // })

        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  onLoadMoreImages = () => {
    this.setState(prevState => {
      return {
        page: (prevState.page += 1),
      };
    });
  };

  render() {
    const { images, status, error } = this.state;

    if (status === 'pending') {
      return (
        <>
          <Gallery>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem key={id} url={webformatURL} tags={tags} />
            ))}
          </Gallery>
          <Loader />
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <Error>{error.message}</Error>
        </>
      );
    }

    if (status === 'resolved') {
      const noResults = images.length === 0;
      const noMoreImages = images.length / 12 < 1;
      return noResults ? (
        <Error> Sorry, we couldn't find a match for your search.</Error>
      ) : (
        <>
          <Gallery>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem key={id} url={webformatURL} tags={tags} />
            ))}
          </Gallery>
          {!noMoreImages && <Button onLoadMoreImages={this.onLoadMoreImages} />}
        </>
      );
    }
  }
}
