import React, { useEffect, useState } from "react";
import Card from "./Card";

let API_KEY = "f5baf8c74c7d5f00a242c165979d0913"
let base_url = "https://api.themoviedb.org/3"
let sub_url = "/trending/movie/week?api_key="
let url = base_url + sub_url + API_KEY;
// let url = "https://api.themoviedb.org/3/trending/movie/week?api_key="+API_KEY;
console.log(process.env);

const Main = () => {
    const [movieData, setData] = useState([]);
    const [url_set, setUrl] = useState(url);

    useEffect(() => {
        fetch(url_set).then(res => res.json()).then(data => {
            setData(data.results);
            setUrl(data.results);
        });
    }, [url_set])

    return (
        <>
            <div class="container">                
                <div class="container h-100">
                    <div class="d-flex justify-content-md-center align-items-center">
                    <h3>Trending Movies</h3>
                    </div>
                </div>
                <div className="row">
                    {
                        (movieData.length === 0) ? <p>Not Found</p> : movieData.map((res, pos) => {
                            return (
                                <Card info={res} key={pos} />
                            )
                        })
                    }
                </div>
            </div>


        </>
    );
}
export default Main;