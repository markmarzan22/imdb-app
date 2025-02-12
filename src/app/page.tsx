'use client';

import { useAppContext } from '@/context/AppContext';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Alert, Typography } from '@material-tailwind/react';

const Home = () => {
    const { movies, responseMessage } = useAppContext();

    if (responseMessage?.Response === 'False') {
        return (
            <Alert
                variant="gradient"
                className="max-w-screen-md mx-auto my-10"
                icon={<ExclamationTriangleIcon className="h-5 w-5" />}
            >
                <Typography color="white" className="font-normal text-center">
                    {responseMessage?.Error}
                </Typography>
            </Alert>
        );
    } else if (movies.length === 0)
        return (
            <Alert variant="gradient" className="max-w-screen-md mx-auto my-10">
                <Typography color="white" className="font-normal text-center">
                    You haven{"'"}t searched for any movie yet. Start by typing in the search bar above.
                </Typography>
            </Alert>
        );
};

export default Home;
