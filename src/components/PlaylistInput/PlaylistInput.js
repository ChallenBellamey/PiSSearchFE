import React, { useContext } from "react";

import { AppContext } from "../../context/index.js";

import "./PlaylistInput.css";

const PlaylistInput = () => {
    const [appState, setAppState] = useContext(AppContext);
    const { playlists, playlistInputValue } = appState;

    const onChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue !== playlistInputValue) {
            setAppState({
                playlistInputValue: inputValue,
            });
        }
    };

    return (
        <div className="playlistInputContainer">
            <span>{"in playlist:"}</span>
            <select
                className="playlistInput"
                value={playlistInputValue}
                onChange={onChange}
            >
                <option>{"All"}</option>
                {Object.keys(playlists).map(playlistTitle => (
                    <option key={playlistTitle}>{playlistTitle}</option>
                ))}
            </select>
        </div>
    );
};

export default PlaylistInput;