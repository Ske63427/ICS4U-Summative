import PosterGrid from '../components/PosterGrid.jsx';
import Footer from '../components/Footer.jsx';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useStoreContext } from "../context/index.jsx";

function AllMoviesView(){
    const [genre, setGenre] = useState(28);
    const [selectedButton, setSelectedButton] = useState(null);
    const genres = [ //Name: [0][0-11], Genre: [1][0-11]
        ["Action", "War", "Sci-Fi", "Fantasy", "Crime", "Thriller", "Horror", "Comedy", "Animation", "History", "Western", "Mystery"],
        [28, 10752, 878, 14, 80, 53, 27, 35, 16, 36, 37, 9648]
    ]
    const { user } = useStoreContext();

    return(
        <div>
            <h1 style={{textAlign: "center"}}>Welcome, {user}</h1>
            <div className="row">
                <div className="col">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr></tr>
                            </thead>
                            <tbody>
                            {Array.from({ length: 3 }).map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {Array.from({length: 4}).map((_, colIndex) => {
                                        const genreId = genres[1][rowIndex * 4 + colIndex];
                                        const genreName = genres[0][rowIndex * 4 + colIndex];

                                        return (
                                            <td key={colIndex} style={{textAlign: "center"}}>
                                                <button
                                                    style={{
                                                        backgroundColor: selectedButton === genreId ? "#883bef" : "#0a43f0",
                                                        borderRadius: "10px",
                                                        width: "200px"
                                                    }}
                                                    onClick={() => {
                                                        setGenre(genres[1][rowIndex * 3 + colIndex]);
                                                        setSelectedButton(genres[1][rowIndex * 4 + colIndex]);
                                                    }}>{genreName}</button>
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <PosterGrid genre={genre}/>
            <Footer/>
            <Outlet/>
        </div>
    )
}

export default AllMoviesView