import { useDebounce } from 'react-use';
import { useEffect, useRef, useState } from 'react';
import { TInitialData } from '@/types/multi-select/multi-select';
import { Icons } from '@/icons/icons';
import { MultiSelectProps } from '@/types/multi-select/multi-select';

const MultiSelect = ({
    placeholder,
    inititalData = [],
    onInputChange,
    onSelectedDataChange,
    options,
    onValueClick,
    disabledInput = false,
}: MultiSelectProps) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<TInitialData[]>([]); // Ensure suggestions is an array
    const [selectedList, setSelectedList] = useState<Set<TInitialData>>(new Set(inititalData || []));
    const inputRef = useRef<HTMLInputElement>(null);

    // Use debounce to reduce the number of input calls
    useDebounce(
        () => {
            if (!input) return;
            onInputChange?.(input);
        },
        1000,
        [input]
    );

    useEffect(() => {
        if (inititalData && inititalData.length > 0) {
            setSelectedList(new Set(inititalData || []));
        } else {
            setSelectedList(new Set([]));
        }
    }, [inititalData]);

    // Focus on the input field when the component loads
    // useEffect(() => {
    //     inputRef.current?.focus();
    // }, [inititalData]);

    // Update the selected items

    useEffect(() => {
        if ([...selectedList].length > 0) {
            onSelectedDataChange([...selectedList]);
        }
    }, [selectedList]);

    // Update the suggestions based on the options prop (search results)
    useEffect(() => {
        if (options && options.length > 0 && input) {
            setSuggestions(options);
        } else {
            setSuggestions([]);
        }
    }, [options, input]);

    // Handle removing selected items
    const handleRemove = ({ label, value }: TInitialData) => {
        const newSet = [...selectedList].filter((d) => d.label !== label && d.value !== value);
        setSelectedList(new Set(newSet));
    };

    return (
        <div className="flex flex-wrap gap-2 border items-center p-2 rounded w-full">
            {selectedList.size > 0 && (
                <div className="flex gap-2 flex-wrap">
                    {[...selectedList].map((d, i) => (
                        <p
                            onClick={(e) => {
                                e.preventDefault();
                                onValueClick?.(d);
                            }}
                            className="bg-primaryColor/10 hover:cursor-pointer text-sm flex items-center whitespace-nowrap border text-primaryColor rounded-md p-1"
                            key={i}
                        >
                            {d.label}{' '}
                            <span
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    handleRemove(d);
                                }}
                            >
                                <Icons.cancel className="size-4 ml-1 text-red-500" />
                            </span>
                        </p>
                    ))}
                </div>
            )}
            <div className="relative flex justify-between items-center w-full">
                <input
                    value={input}
                    disabled={disabledInput}
                    ref={inputRef}
                    onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !input && selectedList.size > 0) {
                            const newSet = [...selectedList].slice(0, -1);
                            setSelectedList(new Set(newSet));
                        }
                    }}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full placeholder:text-sm focus-visible:outline-none"
                    placeholder={placeholder}
                />
                {suggestions && suggestions.length > 0 && (
                    <ul className="absolute max-h-[30vh] overflow-y-auto bg-white flex flex-col gap-3 top-10 border p-2 w-[15rem] rounded -left-2 z-50">
                        {suggestions.map((d, i) => {
                            return [...selectedList].some((s) => s.label === d.label) ? (
                                <li
                                    className="bg-primaryColor/10 w-full flex justify-between items-center rounded-md text-primaryColor hover:cursor-pointer p-1"
                                    key={i}
                                >
                                    {d.label}
                                    <Icons.check className="size-4" />
                                </li>
                            ) : (
                                <li
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        const set = new Set([...selectedList, d]);
                                        setSelectedList(set);
                                        setSuggestions([]);
                                        setInput('');
                                        inputRef.current?.focus();
                                    }}
                                    className="hover:bg-primaryColor/10 w-full rounded-md hover:text-primaryColor hover:cursor-pointer p-1"
                                    key={i}
                                >
                                    {d.label}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MultiSelect;
