import React, { useEffect, useState } from "react";
import CarouselSlide from "./CarouselSlide";
import Nav from "./Nav";

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
            <div className="App">
                <header className="Movie-App">
                </header>
                <body>
                    <Nav />
                    <div className="container">
                        <h3>Upcoming Movies</h3>
                    </div>
                    <div className="row">
                        {
                            (movieData.length == 0) ? <p>Not Found</p> : movieData.map((res, pos) => {
                                return (
                                    <CarouselSlide info={res} key={pos} />
                                )
                            })
                        }
                    </div>
                </body>
            </div>
        </>
    );
}
export default Upcoming;