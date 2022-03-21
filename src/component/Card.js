import React from "react";

const Card = (movie) => {
    console.log(movie.info);
    let image_path ="https://image.tmdb.org/t/p/w500";
    return (
            <div class="col s4 m2">
                <div className="card">
                    <div className="card-image">
                        <img src={image_path+movie.info.poster_path}></img>
                    </div>
                        <p className="">{movie.info.original_title}</p>
                </div>
            </div>
    )
}

export default Card;