import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStoreContext } from "../context";

function SingleMovieView() {
    const [movieData, setMovieData] = useState([]);
    const { cart, setCart } = useStoreContext();
    const params = useParams();

    useEffect(() => {
        (async function getMovies() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${params.id}?api_key=${import.meta.env.VITE_TMDB_KEY}&append_to_response=videos`
            );
            setMovieData(response.data);
        })();
    }, [params.id]);

    // console.log(movieData);

    return(
        <div>
            <div className="container py-4 py-xl-5" style={{marginBottom: "210px"}}>
                <div className="row row-cols-1 row-cols-md-2">
                    <div className="col">
                        <img className="rounded w-100 h-100 fit-cover" style={{minHeight: "300px"}} src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}/>
                    </div>
                    <div className="col d-flex flex-column justify-content-center p-4">
                        <div className="text-center text-md-start d-flex flex-column align-items-center align-items-md-start mb-5">
                            <div>
                                <h4>{movieData.original_title}</h4>
                                <p>{movieData.overview}</p>
                                <a href={"#"}
                                   onClick={() => setCart((prevCart) => prevCart.set(
                                       params.id, {
                                           title: movieData.original_title,
                                           url: movieData.poster_path
                                        }
                                   ))}
                                >Buy Now&nbsp;
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-arrow-right">
                                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleMovieView;