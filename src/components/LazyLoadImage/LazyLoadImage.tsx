import React, { useState } from 'react'

import Spinner from '../UI/Spinner';
import './LazyLoadImage.scss'

interface IState {
  imageLoaded: boolean,
  error: undefined | string
};

interface IProps {
  alt?: string,
  className?: string,
  onClick?: () => void,
  spinnerStyles?: any,
  restProps?: any,
  src: string,
}

const LazyLoadImage = (props: IProps) => {
  const { alt, className, onClick, spinnerStyles, ...restProps } = props;

  const [state, setState] = useState<IState>({
    imageLoaded: false,
    error: undefined,
  })

  const handleImageLoaded = () => {
    setState({
      imageLoaded: true,
      error: ''
    });
  };

  const handleImageErrored = () => {
    setState({
      error: "Failed to load image...",
      imageLoaded: true
    });
  };

  const renderSpinner = () => (
    state.imageLoaded
      ? null
      : <Spinner />
  );

  const renderError = () => (
    state.error
      ? <img
        className="lazy-load__error"
        alt="error"
        title={state.error}
        src="./media/error.png" />
      : null
  );

  const activeClass = !state.error && state.imageLoaded
    ? "lazy-load__image"
    : "lazy-load__image--hidden";
  const propsClass = className
    ? className
    : '';

  return (
    <div className="lazy-load__container">
      {renderSpinner()}
      {renderError()}

      <img
        {...restProps}
        alt={alt ? alt : "lazy"}
        className={`${activeClass} ${propsClass}`}
        onClick={onClick}
        onLoad={handleImageLoaded}
        onError={handleImageErrored} />
    </div>
  );
}

export default LazyLoadImage;