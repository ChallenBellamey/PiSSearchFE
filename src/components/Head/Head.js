import React from "react";

import {
    Title,
    PlaylistInput,
    SearchButton,
    SearchTermsInput,
} from "../index.js";

import "./Head.css";

const Head = () => {
    return (
        <div className="headContainer">
            <Title />
            <SearchTermsInput />
            <PlaylistInput />
            <SearchButton />
        </div>
    );
};

export default Head;