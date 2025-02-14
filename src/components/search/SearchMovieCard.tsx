'use client';

import { MovieOverview } from '@/app/models/movieOverview.model';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { Card, CardHeader, CardBody, Typography, Chip } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';

interface SearchMovieCardProps {
    movie: MovieOverview;
}

const SearchMovieCard: React.FC<SearchMovieCardProps> = ({ movie }) => {
    const router = useRouter();

    const goToMoviePage = () => {
        router.push(`/movie/${movie.imdbID}`);
    };

    const { Title, Year, Type, Poster } = movie;
    return (
        <Card
            className="max-w-[24rem] overflow-hidden mx-auto w-full transition-transform transform hover:scale-105 hover:shadow-lg duration-300 cursor-pointer"
            onClick={goToMoviePage}
        >
            <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-none">
                {Poster !== 'N/A' ? (
                    <img src={Poster} alt={Title} className="w-full h-[200px] object-cover" />
                ) : (
                    <PhotoIcon
                        className="text-gray-500 w-full h-[200px] bg-gray-300"
                        strokeWidth={0.1}
                        stroke="currentColor"
                    />
                )}
            </CardHeader>
            <CardBody>
                <div className="flex mb-2">
                    <Chip variant="ghost" value={`${Year} - ${Type}`} />
                </div>
                <Typography variant="h6" color="blue-gray">
                    {Title}
                </Typography>
            </CardBody>
        </Card>
    );
};

export default SearchMovieCard;
