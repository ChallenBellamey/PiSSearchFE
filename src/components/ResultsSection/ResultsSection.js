import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../../context/index.js";

import {
    ResultsSectionItem,
    SortByInput,
} from "../index.js";

import "./ResultsSection.css";

const sortFunctions = {
    Matches: (a, b) => (Object.values(b.tally).reduce((i, j) => (i + j)) - Object.values(a.tally).reduce((i, j) => (i + j))),
    Latest: (a, b) => (b.publishedAt.localeCompare(a.publishedAt)),
    Oldest: (a, b) => (a.publishedAt.localeCompare(b.publishedAt)),
};

const removeDuplicateItemsReducer = (arr, itemA) => {
    const isDuplicate = arr.find(itemB => (itemA.videoId === itemB.videoId));

    if (!isDuplicate) {
        arr.push(itemA);
    }

    return arr;
};

const sortResults = (results, sortByValue) => (
    results
        .reduce((arr, result) => {
            arr.push(...result.items);

            return arr;
        }, [])
        .reduce(removeDuplicateItemsReducer, [])
        .sort(sortFunctions[sortByValue])
);

const ResultsSection = () => {
    const [appState] = useContext(AppContext);
    const [sortedResults, setSortedResults] = useState(null);
    const { results, sortByValue } = appState;

    useEffect(() => {
        if (results) {
            setSortedResults(sortResults(results, sortByValue));
        }
    }, [setSortedResults, results, sortByValue]);

    useEffect(() => {
        if (!results && sortedResults) {
            setSortedResults(null);
        }
    }, [results, sortedResults, setSortedResults]);

    if (!sortedResults) {
        return null;
    }

    console.log(sortedResults.length)

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