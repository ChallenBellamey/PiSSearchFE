import React, { useContext, useEffect } from "react";
import axios from "axios";

import { AppContext } from "../../context/index.js";

import "./SearchButton.css";

const formatSearchTermsInputValue = (searchTermsInputValue) => {
    return searchTermsInputValue
        .split(",")
        .map(searchTerm => searchTerm.trim());
};

const formatPlaylistInputValue = (playlists, playlistInputValue) => {
    if (playlistInputValue === "All") {
        return undefined;
    }

    return [playlists[playlistInputValue]];
};

const SearchButton = () => {
    const [appState, setAppState] = useContext(AppContext);

    const {
        searchTermsInputValue,
        playlistInputValue,
        playlists,
        apiUrl,
        isLoadingResults,
    } = appState;

    const onClick = () => {
        if (searchTermsInputValue && playlistInputValue) {
            setAppState({
                isLoadingResults: true,
            });
        }
    };

    useEffect(() => {
        if (isLoadingResults) {
            const formattedSearchTerms = formatSearchTermsInputValue(searchTermsInputValue);
            const formattedPlaylists = formatPlaylistInputValue(playlists, playlistInputValue);

            axios.post(apiUrl + "search", {
                searchTerms: formattedSearchTerms,
                playlistIds: formattedPlaylists,
            })
                .then(({ data: { results }}) => {
                    console.log(results)
                    setAppState({
                        isLoadingResults: false,
                        results,
                    });
                })
        }
    }, [setAppState, apiUrl, isLoadingResults, playlistInputValue, playlists, searchTermsInputValue]);

    return (
        <div className="searchButtonContainer">
            <button onClick={onClick}>Search</button>
        </div>
    );
};

export default SearchButton;