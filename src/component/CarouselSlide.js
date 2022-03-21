import React from "react";

const CarouselSlide = (movie) => {
    console.log(movie.info);
    let image_path = "https://image.tmdb.org/t/p/w500";
    return (
        <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
            <div>
                <img src={image_path+movie.info.poster_path}></img>
            </div>
        </Carousel>
    )
}

export default CarouselSlide;