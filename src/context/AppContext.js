import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";

const initialState = {
    apiUrl: "https://pissearchbe.onrender.com/",
    playlists: null,
    results: null,
    isLoadingResults: false,
};

export const AppContext = createContext(initialState);

export const AppContextProvider = (props) => {
    const [appState, setAppState] = useReducer((prevState, state) => ({ ...prevState, ...state }), initialState);
    const { children } = props;
    const { apiUrl, playlists } = appState;

    useEffect(() => {
        if (!playlists) {
            axios.get((apiUrl + "playlists"))
                .then(({ data: { playlists }}) => {
                    setAppState({
                        playlists,
                    });
                });
        }
    }, [apiUrl, playlists])

    return (
        <AppContext.Provider value={[appState, setAppState]}>
            {children}
        </AppContext.Provider>
    );
};