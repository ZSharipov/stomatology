import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchImages, setCurImage } from "../../actions";

const Slider = ({ setCurImage, slides, currentSlideImage, id }) => {
  const handlePrevButton = () => {
    if (currentSlideImage === 0) {
      return;
    }
    this.props.setCurImage(currentSlideImage - 1);
  };

  const handleNextButton = () => {
    if (currentSlideImage === slides.length - 1) {
      return;
    }
    setCurImage(currentSlideImage + 1);
  };
  let src;
  if (slides && slides[0]) {
    src = `/images/${id}/` + slides[currentSlideImage].url;
  } else {
    src = "/images/noFoto.jpg";
  }
  return (
    <div className="container">
      <div className="slider-left">
        <button onClick={handlePrevButton}>&larr;</button>
      </div>
      <div className="slider-center">
        <img src={src} alt="slider-item" />
      </div>
      <div className="slider-right">
        <button onClick={handleNextButton}>&rarr;</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    slides: state.manipulation.slides,
    currentSlideImage: state.manipulation.currentSlideImage,
  };
};
const mapDispatchToProps = {
  fetchImages: fetchImages,
  setCurImage: setCurImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);