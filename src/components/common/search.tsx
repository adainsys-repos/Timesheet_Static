import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Icons } from '@/icons/icons';

interface SearchProps {
    placeholder?: string;
    className?: string;
    paramName?: string;
    debounceTime?: number;
    onSearch?: (value: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ placeholder = 'Search...', className = '', paramName = 'search', debounceTime = 500, onSearch }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get(paramName) || '');

    const debouncedSearch = useCallback(
        (value: string) => {
            const newSearchParams = new URLSearchParams(searchParams);

            if (value) {
                newSearchParams.set(paramName, value);
            } else {
                newSearchParams.delete(paramName);
            }

            setSearchParams(newSearchParams);

            if (onSearch) {
                onSearch(value);
            }
        },
        [searchParams, setSearchParams, paramName, onSearch]
    );

    useEffect(() => {
        const handler = setTimeout(() => {
            debouncedSearch(searchTerm);
        }, debounceTime);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, debouncedSearch, debounceTime]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className={cn('relative w-64 ml-auto', className)}>
            <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primaryColor" />
            <Input type="text" placeholder={placeholder} value={searchTerm} onChange={handleChange} className="pl-10 h-10 bg-background" />
        </div>
    );
};

export default SearchBar;
