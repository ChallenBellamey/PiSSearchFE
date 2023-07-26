import React, { useContext, useMemo } from "react";

import { AppContext } from "../../context/index.js";

import "./ResultsSectionItem.css";

const ResultsSectionItem = ({ item }) => {
    const setAppState = useContext(AppContext)[1];

    const {
        thumbnail,
        title,
        publishedAt,
        tally,
    } = item;

    const onClick = useMemo(() => {
        return () => setAppState({ selectedItem: item });
    }, [setAppState, item]);

    return (
        <button className="resultsSectionItemContainer" onClick={onClick}>
            <div className="itemThumbnailContainer">
                <img className="itemThumbnail" alt={title} src={thumbnail} />
            </div>
            <div className="itemText">
                <div className="itemSnippet">
                    <span className="itemTitle">{title}</span>
                    <span className="itemDate">{new Date(publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="itemMatchesContainer">
                    {Object.keys(tally).map(searchTerm => (
                        <span className={"itemMatch"} key={searchTerm}>{`${searchTerm}: ${tally[searchTerm]}`}</span>
                    ))}
                </div>
            </div>
        </button>
    );
};

export default ResultsSectionItem;