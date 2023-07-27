import React, { useContext } from "react";

import { AppContext } from "../../context/AppContext.js";

import {
    Head,
    ResultsSection,
} from "../index.js";

import './Body.css';

const Body = () => {
    const [appState] = useContext(AppContext);
    const { selectedItem } = appState;

    return (
        <div className={(selectedItem) ? "body modalIsVisible" : "body"} aria-hidden={(selectedItem) ? true : false}>
            <Head />
            <ResultsSection />
        </div>
    );
}

export default Body;
