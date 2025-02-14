'use client';

import { MouseEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Alert, Card, CardBody, CardHeader, IconButton, Typography } from '@material-tailwind/react';
import type { MovieDetails } from '@/app/models/movieDetails.model';
import { ExclamationTriangleIcon, PhotoIcon, StarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import SkeletonLoading from '@/components/search/SkeletonLoading';

export default function MovieDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (typeof id === 'string') {
            searchMovieById(id);
        }
    }, [id]);

    const searchMovieById = (id: string) => {
        setLoading(true);
        axios
            .get<MovieDetails>(`/api/movies/details?id=${id}`)
            .then((res) => setMovie(res.data))
            .catch((err) => {
                console.error('Error fetching movie:', err);
            })
            .finally(() => setLoading(false));
    };

    if (loading)
        return (
            <div className="mx-auto max-w-screen-md mt-6">
                <SkeletonLoading />
            </div>
        );
    if (!movie || movie.Response === 'False')
        return (
            <Alert
                variant="gradient"
                className="max-w-screen-md mx-auto my-10"
                icon={<ExclamationTriangleIcon className="h-5 w-5" />}
            >
                <Typography color="white" className="font-normal text-center">
                    {movie?.Error}
                </Typography>
            </Alert>
        );

    const {
        Title,
        Year,
        Rated,
        Released,
        Runtime,
        Genre,
        Director,
        Writer,
        Actors,
        Plot,
        Language,
        Country,
        Awards,
        Poster,
        Ratings,
        Metascore,
        imdbRating,
        imdbVotes,
        Type,
        totalSeasons
    } = movie;

    const TABLE_HEAD = ['Field', 'Details'];
    const TABLE_ROWS = [
        { field: 'Year', value: Year },
        { field: 'Rated', value: Rated },
        { field: 'Runtime', value: Runtime },
        { field: 'Genre', value: Genre },
        { field: 'Director', value: Director },
        { field: 'Writer', value: Writer },
        { field: 'Actors', value: Actors },
        { field: 'Language', value: Language },
        { field: 'Country', value: Country },
        { field: 'Awards', value: Awards },
        { field: 'IMDB Rating', value: imdbRating },
        { field: 'Ratings', value: Ratings.map(({ Source, Value }) => `${Source}: ${Value}`).join(', ') },
        { field: 'Total Seasons', value: totalSeasons ?? 'N/A' },
        { field: 'Metascore', value: Metascore }
    ];

    const handleNavigateHome = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push('/');
    };

    return (
        <div className="max-w-screen-lg mx-auto">
            <div className="text-right">
                <IconButton
                    variant="text"
                    color="gray"
                    className="rounded-full p-2 hover:bg-gray-200 bg-red-50 relative -bottom-6 z-[1]"
                    onClick={(e: MouseEvent<HTMLButtonElement>) => handleNavigateHome(e)}
                >
                    <XMarkIcon className="h-5 w-5" />
                </IconButton>
            </div>
            <Card className="md:flex-row m-6 mt-0">
                <CardHeader shadow={false} floated={false} className="m-0 md:w-2/5 shrink-0 md:rounded-r-none">
                    {Poster !== 'N/A' ? (
                        <img src={Poster} alt="card-image" className="h-full w-full object-cover" />
                    ) : (
                        <PhotoIcon
                            className="text-gray-500 w-full h-full bg-gray-300"
                            strokeWidth={0.1}
                            stroke="currentColor"
                        />
                    )}
                </CardHeader>
                <CardBody>
                    <div className="flex items-center justify-between">
                        <Typography variant="h6" color="gray" className="mb-4 uppercase">
                            {Released} - {Type}
                        </Typography>
                        <div>
                            <Typography color="blue-gray" className="flex items-center justify-end gap-1.5 font-normal">
                                <StarIcon className="h-5 w-5 text-yellow-700" fill="currentColor" />
                                {imdbRating}
                            </Typography>
                            <Typography color="gray" className="text-sm">
                                {imdbVotes} IMDB votes
                            </Typography>
                        </div>
                    </div>
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {Title}
                    </Typography>
                    <Typography color="gray" className="mb-8 font-normal">
                        {Plot}
                    </Typography>
                    <table className="w-full table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th key={head} className="border-b border-gray-300">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-bold leading-none"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map(({ field, value }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast ? '' : 'border-b border-gray-300';

                                return (
                                    <tr key={field} className="hover:bg-gray-50">
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-bold">
                                                {field}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography variant="small" className="font-normal text-gray-600">
                                                {value}
                                            </Typography>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}
