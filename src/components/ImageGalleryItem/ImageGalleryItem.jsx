import PropTypes from 'prop-types';
const ImageGalleryItem = ({ item, openModal }) => {
  const { tags, webformatURL } = item;
  return (
    <li onClick={() => openModal(item)} className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
    </li>
  );
};
export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};
