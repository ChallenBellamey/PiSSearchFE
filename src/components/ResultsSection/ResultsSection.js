import React, { useContext } from "react";

import { AppContext } from "../../context/index.js";

import {
    ResultsSectionItem,
    SortByInput,
} from "../index.js";

import "./ResultsSection.css";

const ResultsSection = () => {
    const [appState] = useContext(AppContext);
    const { results, isLoadingResults } = appState;

    if (!results && !isLoadingResults) {
        return null;
    }

    if (!results && isLoadingResults) {
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
                    results
                        .map(item => (
                            <ResultsSectionItem key={item.title + item.publishedAt} item={item} />
                        ))
                }
            </div>
        </div>
    );
};

export default ResultsSection;