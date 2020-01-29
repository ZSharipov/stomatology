import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchImages, setCurImage } from '../../actions'

class Slider extends Component {


    handlePrevButton() {
        if (this.props.currentSlideImage === 0) {
            return
        }
        this.props.setCurImage(this.props.currentSlideImage - 1);
    }

    handleNextButton() {
        if (this.props.currentSlideImage === this.props.slides.length - 1) {
            return
        }

        this.props.setCurImage(this.props.currentSlideImage + 1);
    }

    render() {

        const { slides, id, currentSlideImage} = this.props;

        // alert('rendered')
        let src;
        if (slides&&slides[0]) {
            src = `/images/${id}/` + slides[currentSlideImage].url
        }
        else {
            src = '/images/noFoto.jpg'
        }
        return (

            <div className="container">
                <button onClick={() => this.handlePrevButton()}>Prev</button>
                <img src={src} alt="slider-item" />
                <button onClick={() => this.handleNextButton()}>Next</button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        slides: state.manipulation.slides,
        currentSlideImage: state.manipulation.currentSlideImage,
    }
}
const mapDispatchToProps = {
    fetchImages: fetchImages,
    setCurImage: setCurImage,
}
export default connect(mapStateToProps, mapDispatchToProps)(Slider);











// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchImages } from '../../actions'

// class Slider extends Component {


//     state = { currentSlideImage: 0 }


//     handlePrevButton() {
//         let currentSlideImage = this.state.currentSlideImage;
//         if (currentSlideImage === 0) {
//             return
//         }
//         this.setState({
//             currentSlideImage: this.state.currentSlideImage - 1
//         })
//     }

//     handleNextButton() {
//         let currentSlideImage = this.state.currentSlideImage;
//         if (currentSlideImage === this.props.slides.length - 1) {
//             return
//         }

//         this.setState({
//             currentSlideImage: currentSlideImage + 1
//         })
//     }

//     render() {

//         const { slides, id } = this.props;
//         // alert('rendered')
//         let src;
//         if (slides[0]) {
//             src = `/images/${id}/` + slides[this.state.currentSlideImage].url
//         }
//         else {
//             src = '/images/noFoto.jpg'
//         }
//         return (

//             <div className="container">
//                 <button onClick={() => this.handlePrevButton()}>Prev</button>
//                 <img src={src} alt="slider-item" />
//                 <button onClick={() => this.handleNextButton()}>Next</button>
//             </div>
//         );
//     }
// }
// const mapStateToProps = (state) => {
//     return {
//         slides: state.manipulation.slides,
//         slides: state.manipulation.currentSlideImage,
//     }
// }
// const mapDispatchToProps = {
//     fetchImages: fetchImages,
//     setCurImage: setCurImage,
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Slider);