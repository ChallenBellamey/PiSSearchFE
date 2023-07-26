import React, { useContext } from "react";

import { AppContext } from "../../context/index.js";

import "./SearchTermsInput.css";

const SearchTermsInput = () => {
    const [appState, setAppState] = useContext(AppContext);
    const { searchTermsInputValue } = appState;

    const onChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue !== searchTermsInputValue) {
            setAppState({
                searchTermsInputValue: inputValue,
            });
        }
    };

    return (
        <div className="searchTermsInputContainer">
            <span>{"Search for (comma separated):"}</span>
            <input
                className="searchTermsInput"
                value={searchTermsInputValue}
                onChange={onChange}
            />
        </div>
    );
};

export default SearchTermsInput;