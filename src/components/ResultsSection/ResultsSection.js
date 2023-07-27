import React, { useContext } from "react";

import { AppContext } from "../../context/index.js";

import {
    ResultsSectionItem,
    SortByInput,
} from "../index.js";

import "./ResultsSection.css";

const ResultsSection = () => {
    const [appState] = useContext(AppContext);
    const { sortedResults } = appState;

    if (!sortedResults) {
        return null;
    }

    return (
        <div className="resultsSectionContainer">
            <div className="resultsSectionSortByInputContainer">
                <SortByInput />
            </div>
            <div className="resultsSectionItemsContainer">
                {
                    sortedResults
                        .map(item => (
                            <ResultsSectionItem key={item.title + item.publishedAt} item={item} />
                        ))
                }
            </div>
        </div>
    );
};

export default ResultsSection;