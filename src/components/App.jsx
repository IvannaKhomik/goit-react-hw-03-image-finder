import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './App.styled';
import ImageGallery from './ImageGallery';
import { Modal } from './Modal';
import Searchbar from './Searchbar';

export default class App extends Component {
  state = {
    query: '',
  };

  onSearchByQuery = query => {
    this.setState({ query: query });
  };

  render() {
    const { query } = this.state;
    return (
      <Container>
        <Searchbar searchByQuery={this.onSearchByQuery} />
        <ToastContainer autoClose={3000} />
        <ImageGallery query={query} />
        <Modal />
      </Container>
    );
  }
}
