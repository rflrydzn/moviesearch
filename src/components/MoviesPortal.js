import { useState } from 'react';
import { fetchMovies } from '../api/fetchMovies';
import ErrorAlert from './ErrorAlert.js';
import MovieDetail from './MovieDetail.js';

function MoviesPortal(){
    const [searchInputText, setSearchInputText] = useState('')
    const [enteredSearchText, setEnteredSearchText] = useState('')
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)

    function handleSearch(e){
        setSearchInputText(e.target.value)
    }
    function onSearchTextEnter(e){
        e.preventDefault();
        fetchMovies(searchInputText, setMovies, setError)
        setEnteredSearchText(searchInputText)
    }

    return(
        <>    <div>
                <form onSubmit={onSearchTextEnter}>
                    <input type='text' value={searchInputText}
                    onChange={handleSearch}/>
                

                </form>
                
                
            </div>
            {error && <ErrorAlert error={error} searchTerm={enteredSearchText}/>}
            {movies.length > 0 && <p className='text-light'>Showing {movies.length} Movies for '{enteredSearchText}'</p>}
            {movies.map((movie) => (
                <MovieDetail key={movie.imdbID} movie={movie} />
            ))}
            {error}
        </>
    );
}

export default MoviesPortal;