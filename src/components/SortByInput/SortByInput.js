import React, { useContext } from "react";

import { AppContext } from "../../context/index.js";

import "./SortByInput.css";

const SortByInput = () => {
    const [appState, setAppState] = useContext(AppContext);
    const { sortByValue } = appState;

    const onChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue !== sortByValue) {
            setAppState({
                sortByValue: inputValue,
            });
        }
    };

    return (
        <div className="sortByInputContainer">
            <span>{"Sort by:"}</span>
            <select
                className="sortByInput"
                value={sortByValue}
                onChange={onChange}
            >
                <option>{"Matches"}</option>
                <option>{"Latest"}</option>
                <option>{"Oldest"}</option>
            </select>
        </div>
    );
};

export default SortByInput;