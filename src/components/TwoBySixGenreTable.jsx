import { useEffect } from 'react';
import { useStoreContext } from "../context/index.jsx";

function TwoBySixGenreTable({ selectedGenres }) {
    const { selected, setSelected } = useStoreContext();

    const genres = [
        ['Action', 'War'],
        ['Sci-Fi', 'Fantasy'],
        ['Crime', 'Thriller'],
        ['Horror', 'Comedy'],
        ['Animation', 'History'],
        ['Western', 'Mystery']
    ];

    const handleSelect = (genre) => {
        setSelected(prevSelected => {
            let newSelected;
            if (prevSelected.includes(genre)) {
                newSelected = prevSelected.filter(item => item !== genre);
            } else if (prevSelected.length < 10) {
                newSelected = [...prevSelected, genre];
            } else {
                newSelected = prevSelected;
            }
            return newSelected;
        });
    };

    useEffect(() => {
        selectedGenres(selected);  // Pass updated genres to parent component
        // console.log("Selected genres in child:", selected);
    }, [selected]);

    return (
        <table className="table">
            <thead>
            <tr></tr>
            </thead>
            <tbody>
            {genres.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {row.map((genre, colIndex) => (
                        <td
                            key={colIndex}
                            style={{
                                width: "150px",
                                textAlign: "center",
                                backgroundColor: selected.includes(genre) ? 'white' : 'inherit',
                                color: selected.includes(genre) ? 'black' : 'inherit',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleSelect(genre)}
                        >
                            {genre}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default TwoBySixGenreTable;
