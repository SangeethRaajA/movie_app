import React, { useEffect, useState } from "react";
import CarouselSlide from "./CarouselSlide";
import Nav from "./Nav";
import Slide from "./Slide";
import SlideShow from "./SlideShow";

let API_KEY = "f5baf8c74c7d5f00a242c165979d0913"
let base_url = "https://api.themoviedb.org/3"
let sub_url = "/movie/upcoming?api_key="
let url = base_url + sub_url + API_KEY

const Upcoming = () => {
    const [movieData, setData] = useState([]);
    const [url_set, setUrl] = useState(url);

    useEffect(() => {
        fetch(url_set).then(res => res.json()).then(data => {
            setData(data.results);
        });
    }, [url_set])

    return (
        <>
            <body>
                <div class="container h-100">
                    <div class="d-flex justify-content-md-center align-items-center">
                    <h3>Upcoming Movies</h3>
                    </div>
                </div>

                <div className="container-fluid">
                    {
                        (movieData.length == 0) ? <p>Not Found</p> : movieData.map((res, pos) => {
                            return (
                                <Slide info={res} key={pos} />
                            )
                        })
                    }
                </div>
            </body>
        </>
    );
}

export default Upcoming;