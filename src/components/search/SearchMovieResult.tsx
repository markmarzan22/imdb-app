import { useAppContext } from '@/context/AppContext';
import SearchMovieCard from './SearchMovieCard';

const SearchMovieResult = () => {
    const { movies } = useAppContext();
    return (
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {movies.map((movie) => (
                <SearchMovieCard key={movie.imdbID} movie={movie} />
            ))}
        </div>
    );
};

export default SearchMovieResult;
