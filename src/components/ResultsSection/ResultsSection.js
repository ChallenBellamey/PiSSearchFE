import React, { useContext } from "react";

import { AppContext } from "../../context/index.js";

import {
    ResultsSectionItem
} from "../index.js";

import "./ResultsSection.css";

const ResultsSection = () => {
    const [appState] = useContext(AppContext);
    const { results } = appState;

    return (
        <div className="resultsSectionContainer">
            {
                results && results.map(result => (
                    result.items.map(item => (
                        <ResultsSectionItem key={item.title} item={item} />
                    ))
                ))
            }
        </div>
    );
};

export default ResultsSection;