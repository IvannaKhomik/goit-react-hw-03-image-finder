import { LoadBtn } from './Button.styled';

export const Button = ({ onLoadMoreImages }) => {
  return (
    <LoadBtn type="button" onClick={onLoadMoreImages}>
      Load more
    </LoadBtn>
  );
};
