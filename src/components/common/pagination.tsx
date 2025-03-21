import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { Button } from '../ui/button';

interface PaginationProps {
    maxPages: number;
    currentLocation?: string;
    total: number;
}

const DataPagination: React.FC<PaginationProps> = ({ maxPages, currentLocation, total }) => {
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = searchParams.get('page');

    useEffect(() => {
        if (!currentPage) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                page: '1',
            });
        }
    }, [currentPage]);
    const usePreviousSearchParams = ({ newSearchParams }: { newSearchParams: URLSearchParams }) => {
        for (const [key, value] of searchParams.entries()) {
            if (value) {
                newSearchParams.set(key, value);
            }
        }
    };

    const handlePreviousPage = () => {
        const searchParams = new URLSearchParams();
        usePreviousSearchParams({ newSearchParams: searchParams });
        searchParams.set('page', (+currentPage! - 1).toString());
        setSearchParams(searchParams);
        // navigate({
        //     pathname: currentLocation,
        //     search: `?page=${+currentPage! - 1}`,
        // })
    };
    const handleNextPage = () => {
        const searchParams = new URLSearchParams();
        usePreviousSearchParams({ newSearchParams: searchParams });
        searchParams.set('page', (+currentPage! + 1).toString());
        setSearchParams(searchParams);
        // navigate({
        //     pathname: currentLocation,
        //     search: `?page=${+currentPage! + 1}`,
        // })
    };

    const startDataCount = (+currentPage! - 1) * 20;
    const endDataCount = +currentPage! * 20;
    return (
        <footer className="flex flex-1 select-none items-center justify-between mt-4 mr-7">
            <div className="text-sm ml-4">
                {+currentPage! == maxPages
                    ? `Showing ${startDataCount} to ${total} of ${total}`
                    : `Showing ${startDataCount} to ${endDataCount} of ${total}`}
            </div>
            <div className="flex items-center">
                <Button
                    disabled={+currentPage! == 1}
                    type="button"
                    onClick={handlePreviousPage}
                    className="!py-1 !px-2 min-w-8 h-[1.9rem] bg-white text-primaryColor rounded-none rounded-l hover:bg-primaryColor hover:text-white transition-all border"
                >
                    <ChevronLeft className="size-3" />
                </Button>
                {Array.from({ length: maxPages >= 10 ? 4 : maxPages }).map((_, index) => (
                    <>
                        <button
                            type="button"
                            onClick={() => navigate({ pathname: currentLocation, search: `?page=${index + 1}` })}
                            key={index}
                            className={cn(
                                'py-1 px-2 min-w-8 text-sm border',
                                index + 1 == +currentPage! ? 'bg-primaryColor text-white' : 'text-primaryColor'
                            )}
                        >
                            {index + 1}
                        </button>
                    </>
                ))}

                {currentPage && maxPages > 10 && (
                    <>
                        <p className="py-1 px-2 min-w-8 text-sm text-center flex items-center justify-center">...</p>
                        {+currentPage > 5 && +currentPage < maxPages ? (
                            <button
                                type="button"
                                onClick={() => navigate({ pathname: currentLocation, search: `?page=${currentPage! + 1}` })}
                                className={cn('py-1 px-2 min-w-8 text-sm border', +currentPage! ? 'bg-primaryColor text-white' : 'text-primaryColor')}
                            >
                                {currentPage}
                            </button>
                        ) : +currentPage === maxPages && currentPage ? (
                            <button
                                type="button"
                                onClick={() => navigate({ pathname: currentLocation, search: `?page=${maxPages - 1}` })}
                                className={cn(
                                    'py-1 px-2 min-w-8 text-sm border',
                                    +currentPage == maxPages - 1 ? 'bg-primaryColor text-white' : 'text-primaryColor'
                                )}
                            >
                                {maxPages - 1}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={() => navigate({ pathname: currentLocation, search: `?page=${5}` })}
                                className={cn(
                                    'py-1 px-2 min-w-8 text-sm border',
                                    +currentPage == 5 ? 'bg-primaryColor text-white' : 'text-primaryColor'
                                )}
                            >
                                5
                            </button>
                        )}
                        <p className="py-1 px-2 min-w-8 text-sm flex items-center justify-center">...</p>
                    </>
                )}

                {currentPage && maxPages > 10 && (
                    <>
                        <button
                            type="button"
                            onClick={() => navigate({ pathname: currentLocation, search: `?page=${maxPages}` })}
                            className={cn(
                                'py-1 px-2 min-w-8 text-sm border',
                                +currentPage === maxPages ? 'bg-primaryColor text-white' : 'text-primaryColor'
                            )}
                        >
                            {maxPages}
                        </button>
                    </>
                )}
                <Button
                    disabled={+currentPage! == maxPages}
                    type="button"
                    onClick={handleNextPage}
                    className="py-1 px-2 min-w-8 h-[1.9rem]  hover:bg-primaryColor bg-white text-primaryColor rounded-none hover:text-white transition-all rounded-r border"
                >
                    <ChevronRight className="size-3" />
                </Button>
            </div>
        </footer>
    );
};

export default DataPagination;
