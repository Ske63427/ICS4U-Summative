import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; //, useParams
import axios from "axios";
import { useStoreContext } from "../context/index.jsx";
import { auth } from "../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function PosterGrid({ genre }) {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [movieData, setMovieData] = useState({});
    const { setCart } = useStoreContext(); //cart,
    // const params = useParams();
    const firestore = getFirestore();

    useEffect(() => {
        (async function getMovies() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${genre}`
            );
            setMovies(response.data.results);
        })();
    }, [genre]);

    async function handleBuyNow(movie) {
        const user = auth.currentUser;

        if (user) {
            const userDoc = await getDoc(doc(firestore, "users", user.uid));
            const previousPurchaseHistory = userDoc.data().previousPurchaseHistory || [];
            const purchasedMovies = previousPurchaseHistory.flatMap(entry => entry.movies || []);

            if (purchasedMovies.includes(movie.id)) {
                alert(`You have already purchased ${movie.original_title}`);
                return;
            }
        }


        setCart((prevCart) =>
            prevCart.set(movie.id, {
                title: movie.original_title,
                url: movie.poster_path,
            })
        );
    }

    function loadMovie(id) {
        navigate(`/movies/${id}`);
    }

    console.log(movies);
    console.log(movieData?.original_title);

    return (
        <div>
            <div className="row">
                <div className="col">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr></tr>
                            </thead>
                            <tbody>
                            {movies.length > 19 && (
                                <>
                                    {Array.from({ length: 4 }).map((_, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {Array.from({ length: 5 }).map((_, colIndex) => {
                                                const movie = movies[rowIndex * 5 + colIndex];
                                                return (
                                                    <td key={colIndex}>
                                                        <div className={"card"}>
                                                            <img
                                                                className="card-img-top w-100 d-block"
                                                                alt={`Card ${rowIndex}-${colIndex}`}
                                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                                onClick={() => {
                                                                    loadMovie(movie.id);
                                                                }}
                                                            />
                                                            <div
                                                                className="card-body"
                                                                style={{ display: "flex", justifyContent: "center" }}
                                                            >
                                                                <button
                                                                    className="btn btn-primary"
                                                                    type="button"
                                                                    style={{ textAlign: "center" }}
                                                                    onClick={() => handleBuyNow(movie)}
                                                                >
                                                                    Buy Now
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                );
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
    );
}

export default PosterGrid;
