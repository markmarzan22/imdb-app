import { MediaType } from './movieOverview.model';

interface MovieRating {
    Source: string;
    Value: string;
}

export interface MovieDetails {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: MovieRating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: MediaType;
    totalSeasons?: string;
    Response: 'True' | 'False';
}
