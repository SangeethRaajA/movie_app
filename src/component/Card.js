import React from "react";

const Card = (movie) => {
    console.log(movie.info);
    let image_path = "https://image.tmdb.org/t/p/w500";
    return (
        <div class="col-sm-3">
            <div class="card" >
                <img src={image_path + movie.info.poster_path} class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{movie.info.original_title}</h5>
                </div>
            </div>
            <br></br>
        </div>
        
    )
}

export default Card;