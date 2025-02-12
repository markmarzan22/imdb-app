'use client';

import { MovieOverview } from '@/app/models/movieOverview.model';
import { Card, CardHeader, CardBody, Typography, Chip } from '@material-tailwind/react';

interface SearchMovieCardProps {
    movie: MovieOverview;
}

const SearchMovieCard: React.FC<SearchMovieCardProps> = ({ movie }) => {
    const { Title, Year, Type, Poster } = movie;
    return (
        <Card className="max-w-[24rem] overflow-hidden">
            <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-none">
                <img src={Poster} alt={Title} className="w-full h-[200px] object-cover" />
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
