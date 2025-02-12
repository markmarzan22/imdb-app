'use client';

import { useEffect, useState } from 'react';
import { Navbar, Collapse, IconButton, Input, Tabs, TabsHeader, Tab, Chip } from '@material-tailwind/react';
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSearchMovies } from '@/hooks/useSearchMovies';
import { useAppContext } from '@/context/AppContext';
import { MediaType } from '@/app/models/movieOverview.model';

const TopNavbar = () => {
    const { searchMovies } = useSearchMovies();
    const { query, setQuery, mediaType, setMediaType } = useAppContext();
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    const TABS = [
        {
            label: 'All',
            value: ''
        },
        {
            label: 'Movie',
            value: MediaType.movie
        },
        {
            label: 'Series',
            value: MediaType.series
        },
        {
            label: 'Episode',
            value: MediaType.episode
        }
    ];

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setQuery(value);
        searchMovies(value, mediaType as MediaType);
    };

    const onTabChange = (value: string) => {
        setMediaType(value);
        searchMovies(query, value as MediaType);
    };

    return (
        <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4">
            <div className="container mx-auto flex flex-wrap items-center justify-between text-blue-gray-900">
                <Chip color="cyan" value="IMDB App" size="lg" />
                <div className="hidden items-center gap-x-5 lg:flex">
                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            value={query}
                            onChange={handleSearch}
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                </div>
                <hr className="mb-3 mt-6 hidden w-full lg:block" />

                <IconButton variant="text" className="lg:hidden" onClick={() => setOpenNav(!openNav)}>
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
                <div className="hidden lg:block">
                    <Tabs value={mediaType} className="w-full md:w-max">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value} onClick={() => onTabChange(value)}>
                                    <span className="p-3">{label}</span>
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                </div>
            </div>
            <Collapse open={openNav}>
                <div className="container mx-auto">
                    <div className="flex flex-col gap-x-2 sm:flex-row sm:items-center mt-4">
                        <div className="relative w-full gap-2 md:w-max">
                            <Input
                                label="Search"
                                onChange={handleSearch}
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                    </div>
                    <Tabs value={mediaType} className="w-full md:w-max mt-4">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab key={value} value={value} onClick={() => onTabChange(value)}>
                                    <span className="p-3">{label}</span>
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                </div>
            </Collapse>
        </Navbar>
    );
};

export default TopNavbar;
