import React from "react";

const LoadMore = ({handleLoadMore}) => {
    return (
        <button
        className="load-more"
        type="button"
        onClick={handleLoadMore}
        >
          Загрузить еще</button>
    )};

export default LoadMore;
