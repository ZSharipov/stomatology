import React, { Component } from 'react';
import { connect } from 'react-redux';

class Slider extends Component {


    
    state = { currentSlideImage: 0 }


    handlePrevButton() {
        let currentSlideImage = this.state.currentSlideImage;
        if (currentSlideImage === 0){
            return
        }
        this.setState({
            currentSlideImage: currentSlideImage - 1
        })
    }

    handleNextButton() {
        let currentSlideImage = this.state.currentSlideImage;
        if (currentSlideImage === this.props.slides.length-1){
            return
        }
            
        this.setState({
            currentSlideImage: currentSlideImage + 1
        })
    }

    render() {  
        
        return (

            <div className="container">
                <button onClick={() => this.handlePrevButton()}>Prev</button>
                <img src={this.props.slides[this.state.currentSlideImage]} alt="slider-item" />
                <button onClick={() => this.handleNextButton()}>Next</button>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        slides: state.manipulation.slides,
    }
}
export default connect(mapStateToProps)(Slider);