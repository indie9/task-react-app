import React from "react";
import { events } from "../../store";

const ClearArchive = () => {
    const handleDeleteArchive = (evt) => {
        evt.preventDefault();
        //events.deleteArchive();
        events.archiveData.map(item => events.deleteEvent(item._id));
      }
    return (
        <button 
        className="load-more" 
        type="button"
        onClick={handleDeleteArchive}>  Очистить </button>
    )};

export default ClearArchive;