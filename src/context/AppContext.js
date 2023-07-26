import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";

import { usePrevState } from "../hooks/index.js";

const initialState = {
    // apiUrl: "https://pissearchbe.onrender.com/",
    apiUrl: "http://localhost:9090/",
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
    const { apiUrl, playlists, results, searchTermsInputValue, playlistInputValue } = appState;

    useEffect(() => {
        if (!playlists) {
            axios.get((apiUrl + "playlists"))
                .then(({ data: { playlists }}) => {
                    setAppState({
                        playlists,
                        playlistInputValue: "All",
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

    return (
        <AppContext.Provider value={[appState, setAppState]}>
            {!playlists && <span>Loading...</span>}
            {playlists && children}
        </AppContext.Provider>
    );
};