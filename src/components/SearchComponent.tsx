import React, { useState, useEffect } from 'react';
import { Media } from '../models';
import { searchForMedia } from '../services/AnilistService';
import MediaComponent from './MediaComponent';
import useDebounce from '../hooks/useDebounce';

export interface SearchComponentProps {
    onResultSelected: (media: Media) => void
}

const SearchComponent: React.FC<SearchComponentProps> = (props) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResult, setSearchResult] = useState<Media[]>([]);
    const debouncedSearch = useDebounce(searchTerm, 1000);

    useEffect(() => {
        searchForMedia(debouncedSearch).then(x => setSearchResult(x));
    }, [debouncedSearch]);

    return <>
        <input
            placeholder="Type to search"
            onChange={e => setSearchTerm(e.target.value)}
        />
        {!!searchResult.length ? searchResult.map(x => <MediaComponent media={x} key={x.Id} onClick={props.onResultSelected}/>) : "No results"}
    </>
}

export default SearchComponent;