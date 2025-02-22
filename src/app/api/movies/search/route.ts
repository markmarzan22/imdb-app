import { NextResponse } from 'next/server';
import { MovieSearchResponse } from '@/app/models/movieOverview.model';

export const config = {
    runtime: 'edge'
};

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page');
    const type = searchParams.get('type');

    if (!query) {
        return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    try {
        const apiKey = process.env.OMDB_API_KEY;
        let url = `http://www.omdbapi.com/?apikey=${apiKey}`;

        if (query) {
            url += `&s=${query}&page=${page}`;
        }
        if (type) {
            url += `&type=${type}`;
        }

        const response = await fetch(url, {
            next: { revalidate: 3600 }
        });
        const data: MovieSearchResponse = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('OMDb API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
    }
}
