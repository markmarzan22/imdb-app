import { NextResponse } from 'next/server';
import axios from 'axios';
import { MovieSearchResponse } from '@/app/models/movieOverview.model';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const id = searchParams.get('id');
    const page = searchParams.get('page');

    if (!query && !id) {
        return NextResponse.json({ error: 'Query or ID is required' }, { status: 400 });
    }

    try {
        const apiKey = process.env.OMDB_API_KEY;
        let url = `http://www.omdbapi.com/?apikey=${apiKey}`;

        if (query) {
            url += `&s=${query}&page=${page}`;
        } else if (id) {
            url += `&i=${id}`;
        }

        const response = await axios.get<MovieSearchResponse>(url);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('OMDb API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
    }
}
