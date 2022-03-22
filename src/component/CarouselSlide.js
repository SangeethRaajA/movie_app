import React, { Children } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


const CarouselSlide = (movie) => {
    // console.log(movie.info);
    let image_path = "https://image.tmdb.org/t/p/w500";

    const buttons = Children.map(this.props.children, child => (
        // <button>
        //     {child}
        // </button>
        <img src={image_path + movie.info.poster_path}>
            {child}
        </img>
    ));

    return (
        <Carousel>
            {/* <div className="container">
                <img src={image_path + movie.info.poster_path}></img>
            </div> */}
            <div>
                <h1>Total Children: {Children.count(this.props.children)}</h1>
                {buttons}
            </div>
        </Carousel>
    )
}

export default CarouselSlide;