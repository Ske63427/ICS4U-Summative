import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

function PosterGrid({genre}) {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([])

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
                                                                <button className="btn btn-primary" type="button" style={{textAlign: "center"}}>Buy Now</button>
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