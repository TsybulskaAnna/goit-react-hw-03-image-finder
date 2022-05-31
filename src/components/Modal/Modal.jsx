import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.Esc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.Esc);
  }
  Click = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };
  Esc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.modalItem;
    return createPortal(
      <div onClick={this.Click} className="Overlay">
        <div className="Modal">
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;