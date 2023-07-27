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
            <span>Note: "Psychology in Seattle Podcast" playlist size seems to be causing issues for the free hosting service. Avoid using it and "All" for now and I will try to find a workaround.</span>
            <SearchTermsInput />
            <PlaylistInput />
            <SearchButton />
        </div>
    );
};

export default Head;