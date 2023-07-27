import React, { useContext } from "react";

import { AppContext } from "../../context/index.js";

import {
    ResultsSectionItem,
    SortByInput,
} from "../index.js";

import "./ResultsSection.css";

const ResultsSection = () => {
    const [appState] = useContext(AppContext);
    const { sortedResults, isLoadingResults } = appState;

    if (!sortedResults && !isLoadingResults) {
        return null;
    }

    if (!sortedResults && isLoadingResults) {
        return (
            <div className="resultsSectionContainer">
                {isLoadingResults && <span>Loading...</span>}
            </div>
        );
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