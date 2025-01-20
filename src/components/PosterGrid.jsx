import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom"
import axios from "axios";
import {useStoreContext} from "../context/index.jsx";

function PosterGrid({genre}) {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([])
    const [movieData, setMovieData] = useState({});
    const { cart, setCart } = useStoreContext();
    const params = useParams();

    useEffect(() => {
        (async function getMovies() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${genre}`
            );
            setMovies(response.data.results);
        })();
    }, [genre]);

    function loadMovie(id) {
        navigate(`/movies/${id}`);
    }

    console.log(movies)
    console.log(movieData?.original_title);

    return (
        <div>
            <div className="row">
                <div className="col">
                    <div className="table-responsive">
                        <table className="table">
                            <thead><tr></tr></thead>
                            <tbody>
                            {movies.length > 19 && (
                                <>
                                    {Array.from({ length: 4 }).map((_, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {Array.from({ length: 5 }).map((_, colIndex) => {
                                                const movie = movies[rowIndex * 5 + colIndex]
                                                return(
                                                    <td key={colIndex}>
                                                        <div className={"card"}>
                                                            <img
                                                                className="card-img-top w-100 d-block"
                                                                alt={`Card ${rowIndex}-${colIndex}`}
                                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                                onClick={() => {
                                                                    loadMovie(movie.id)
                                                                }}
                                                            />
                                                            <div className="card-body" style={{display: "flex", justifyContent: "center"}}>
                                                                <button
                                                                    className="btn btn-primary"
                                                                    type="button"
                                                                    style={{textAlign: "center"}}
                                                                    onClick={() => setCart((prevCart) => prevCart.set(
                                                                        movie.id, {
                                                                            title: movie.original_title,
                                                                            url: movie.poster_path
                                                                        }
                                                                    ))}
                                                                >Buy Now</button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    ))}
                                </>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PosterGrid