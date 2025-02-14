import { NextResponse } from 'next/server';
import axios from 'axios';
import { MovieDetails } from '@/app/models/movieDetails.model';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const apiKey = process.env.OMDB_API_KEY;
        let url = `http://www.omdbapi.com/?apikey=${apiKey}`;

        if (id) {
            url += `&i=${id}`;
        }

        const response = await axios.get<MovieDetails>(url);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error('OMDb API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
    }
}
