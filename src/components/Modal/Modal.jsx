import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContent, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  onClickModal = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    const { url, tag } = this.props;
    return createPortal(
      <Overlay onClick={this.onClickModal}>
        <ModalContent>
          <ModalImg src={url} alt={tag} />
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
}
