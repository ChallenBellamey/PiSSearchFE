import React, { useContext, useEffect, useState } from "react";
import FocusTrap from "focus-trap-react";

import { AppContext } from "../../context/index.js";

import "./ResultsSectionItemModal.css";

const ResultsSectionItemModal = () => {
    const [appState, setAppState] = useContext(AppContext);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { selectedItem, sortedResults } = appState;
    const isAtStart = (currentIndex === 0);
    const isAtEnd = ((currentIndex + 1) === sortedResults?.length)

    useEffect(() => {
        if (selectedItem) {
            const index = sortedResults.indexOf(selectedItem);

            setCurrentIndex(index);
        }
    }, [selectedItem, sortedResults, setCurrentIndex]);

    if (!selectedItem) {
        return null;
    }

    const {
        thumbnail,
        title,
        publishedAt,
        captions,
    } = selectedItem;

    const onClose = () => {
        setAppState({
            selectedItem: null,
        });
    };

    const onSkip = (indexDiff) => {
        const newSelectedItem = sortedResults[currentIndex + indexDiff]

        if (newSelectedItem) {
            setAppState({
                selectedItem: newSelectedItem,
            });
        }
    };

    const onSkipLeft = () => onSkip(-1);
    const onSkipRight = () => onSkip(1);

    return (
        <FocusTrap>
            <div className="resultsSectionItemModalContainer">
                <div className="resultsSectionItemModalInnerContainer">
                    <div className="resultsSectionItemModalBackdropFilter" onClick={onClose} tabIndex={0}/>
                    <div className="resultsSectionItemModal">
                        <div className="itemThumbnailContainer">
                            <img className="itemThumbnail" alt={title} src={thumbnail} />
                        </div>
                        <button aria-label="Close result" className="modalButton modalCloseButton" onClick={onClose}>
                            {"X"}
                        </button>
                        {!isAtStart && (
                            <button aria-label="Go to previous result" className="modalButton modalSkipButtonLeft" onClick={onSkipLeft}>
                                {"<"}
                            </button>
                        )}
                        {!isAtEnd && (
                            <button aria-label="Go to next result" className="modalButton modalSkipButtonRight" onClick={onSkipRight}>
                                {">"}
                            </button>
                        )}
                        <div className="itemText">
                            <div className="itemSnippet">
                                <span className="itemTitle">{title}</span>
                                <span className="itemDate">{new Date(publishedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="itemCaptionsContainer">
                                {captions.map(caption => (
                                    <div className={"itemCaption"} key={caption.time}>
                                        <a href={caption.url} target="_blank" rel="noreferrer">
                                            <span className={"itemCaptionTime"}>{caption.time}</span>
                                        </a>
                                        <span className={"itemCaptionText"}>{caption.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FocusTrap>
    );
};

export default ResultsSectionItemModal;