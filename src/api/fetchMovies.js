export const fetchMovies = async (searchText, moviesCallback, errorCallback) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=b9465903&type=movie`);
        const data = await response.json();

        if (data.Response === 'True') {
            const movieDetailsPromises = data.Search.map((movie) =>
                fetchMovieDetails(movie.imdbID, errorCallback)
            );
            const movieDetails = await Promise.all(movieDetailsPromises);

            // Send movie details through the callback
            moviesCallback(movieDetails);
            errorCallback(null); // Clear any previous errors
        } else {
            // Call the callback with an empty array in case of failure
            moviesCallback([]);
            errorCallback(data.Error || 'No results found.');
        }
    } catch (err) {
        // Catch network or other unexpected errors
        moviesCallback([]);
        errorCallback('An error occurred while fetching data.');
    }
};

const fetchMovieDetails = async (id, errorCallback) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=b9465903`);
        const data = await response.json();

        if (data.Response === 'True') {
            return data;
        } else {
            throw new Error(data.Error || 'Error fetching movie details.');
        }
    } catch (err) {
        // Invoke the error callback for individual movie detail fetch failures
        errorCallback(err.message);
        return null; // Return null in case of error to allow Promise.all to resolve
    }
};