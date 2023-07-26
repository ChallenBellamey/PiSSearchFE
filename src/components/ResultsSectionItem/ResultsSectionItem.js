import React from "react";

import "./ResultsSectionItem.css";

const ResultsSectionItem = ({ item }) => {

    const {
        thumbnail,
        title,
        publishedAt,
        tally,
    } = item;

    return (
        <div className="resultsSectionItemContainer">
            <div className="itemThumbnailContainer">
                <img className="itemThumbnail" alt={title} src={thumbnail} />
            </div>
            <div className="itemText">
                <div className="itemSnippet">
                    <span className="itemTitle">{title}</span>
                    <span className="itemDate">{new Date(publishedAt).toLocaleDateString()}</span>
                </div>
                <div>
                    {Object.keys(tally).map((searchTerm, index) => (
                        <span className={"itemMatch"} key={searchTerm}>{`${searchTerm}: ${tally[searchTerm]}`}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResultsSectionItem;