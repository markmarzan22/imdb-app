import { PhotoIcon } from '@heroicons/react/24/outline';
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react';

const SkeletonLoading = () => {
    return (
        <Card className="animate-pulse">
            <CardHeader
                shadow={false}
                floated={false}
                className="relative grid h-[200px] place-items-center bg-gray-300"
            >
                <PhotoIcon className="th-12 w-12 text-gray-500" strokeWidth={2} stroke="currentColor" />
            </CardHeader>
            <CardBody>
                <Typography as="div" variant="h1" className="mb-4 h-3 w-56 rounded-full bg-gray-300">
                    &nbsp;
                </Typography>
                <Typography as="div" variant="paragraph" className="mb-2 h-2 w-full rounded-full bg-gray-300">
                    &nbsp;
                </Typography>
                <Typography as="div" variant="paragraph" className="mb-2 h-2 w-full rounded-full bg-gray-300">
                    &nbsp;
                </Typography>
                <Typography as="div" variant="paragraph" className="mb-2 h-2 w-full rounded-full bg-gray-300">
                    &nbsp;
                </Typography>
                <Typography as="div" variant="paragraph" className="mb-2 h-2 w-full rounded-full bg-gray-300">
                    &nbsp;
                </Typography>
            </CardBody>
        </Card>
    );
};
export default SkeletonLoading;
