import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";

import { usePrevState } from "../hooks/index.js";

const sortFunctions = {
    Matches: (a, b) => (Object.values(b.tally).reduce((i, j) => (i + j)) - Object.values(a.tally).reduce((i, j) => (i + j))),
    Latest: (a, b) => (b.publishedAt.localeCompare(a.publishedAt)),
    Oldest: (a, b) => (a.publishedAt.localeCompare(b.publishedAt)),
};

const sortResults = (results, sortByValue) => (
    results
        .sort(sortFunctions[sortByValue])
);

const initialState = {
    apiUrl: "https://pissearchbe.onrender.com/",
    // apiUrl: "http://localhost:9090/",
    playlists: null,
    results: null,
    isLoadingResults: false,
    searchTermsInputValue: "",
    playlistInputValue: null,
    sortByValue: "Matches",
    selectedItem: null,
};

export const AppContext = createContext(initialState);

export const AppContextProvider = (props) => {
    const [appState, setAppState] = useReducer((prevState, state) => ({ ...prevState, ...state }), initialState);
    const prevState = usePrevState(appState);
    const { children } = props;
    const { apiUrl, playlists, results, searchTermsInputValue, playlistInputValue, sortByValue } = appState;

    useEffect(() => {
        if (!playlists) {
            axios.get((apiUrl + "playlists"))
                .then(({ data: { playlists }}) => {
                    setAppState({
                        playlists,
                        playlistInputValue: Object.keys(playlists)[0],
                    });
                });
        }
    }, [apiUrl, playlists]);

    useEffect(() => {
        const prevSearchTermsInputValue = prevState?.searchTermsInputValue;
        const prevPlaylistInputValue = prevState?.playlistInputValue;
        const searchTermsInputValueHasChanged = (prevSearchTermsInputValue !== searchTermsInputValue);
        const playlistInputValueHasChanged = (prevPlaylistInputValue !== playlistInputValue);
        const shouldResetResults = (searchTermsInputValueHasChanged || playlistInputValueHasChanged);

        if (results && shouldResetResults) {
            setAppState({
                results: null,
            });
        }
    }, [setAppState, prevState, results, searchTermsInputValue, playlistInputValue]);

    useEffect(() => {
        const prevResults = prevState?.results;
        const prevSortByValue = prevState?.sortByValue;
        const resultsHaveChanged = (results !== prevResults);
        const sortByValueHasChanged = (sortByValue !== prevSortByValue);
        const shouldSort = (resultsHaveChanged || sortByValueHasChanged);

        if (results && sortByValue && shouldSort) {
            setAppState({
                results: sortResults(results, sortByValue),
            });
        }
    }, [setAppState, results, sortByValue, prevState]);

    return (
        <AppContext.Provider value={[appState, setAppState]}>
            {!playlists && <span className="initialLoadMessage">Loading...</span>}
            {playlists && children}
        </AppContext.Provider>
    );
};