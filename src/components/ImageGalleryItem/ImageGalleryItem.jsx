import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url, tags }) => {
  return (
    <>
      <GalleryItem>
        <GalleryImg src={url} alt={tags} />
      </GalleryItem>
    </>
  );
};
