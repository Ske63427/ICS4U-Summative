import {useEffect, useState} from "react";
import axios from "axios";

function Feature(){
    const [movies, setMovies] = useState([])

    function shuffle(array) {
        //i love stack overflow
        let currentIndex = array.length;

        while (currentIndex !== 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array
    }

    useEffect(() => {
        (async function getMovies() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`
            );
            setMovies(shuffle(response.data.results))
        })();
    }, []);

    return (
        <div>
            <h1 style={{textAlign: "center", marginBottom: "20px"}}>Now Playing</h1>
            <div className="row">
                {movies.length > 19 && (
                    <>
                        <div className="col" style={{display: "flex", justifyContent: "center"}}>
                            <img style={{width: "275px", height: "400px"}}
                                 src={`https://image.tmdb.org/t/p/w500${movies[0].poster_path}`}/>
                        </div>
                        <div className="col" style={{display: "flex", justifyContent: "center"}}>
                            <img style={{width: "275px", height: "400px"}}
                                 src={`https://image.tmdb.org/t/p/w500${movies[1].poster_path}`}/>
                        </div>
                        <div className="col" style={{display: "flex", justifyContent: "center"}}>
                            <img style={{width: "275px", height: "400px"}}
                                 src={`https://image.tmdb.org/t/p/w500${movies[2].poster_path}`}/>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Feature