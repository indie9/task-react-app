import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/ru";


const Pagination = ({startPage,prevPage,nextPage,endPage,page,pages}) => {

  return (
    <div className="pag_buttons">

    <button
      className='btn default'
      onClick={startPage}
      disabled={page == 0}
    > {'Начало'} </button>

    <button
      className='btn default'
      onClick={prevPage}
      disabled={page == 0}
    > {'Назад'} </button>

    <button  className=' btn primary' >{page + 1}</button>

    <button
      className='btn default'
      onClick={nextPage}
      disabled={Math.floor(pages.length / 8) < page+1 || pages.length-(page+1)*8 == 0}
    > {'Вперед'} </button>

    <button
      className='btn default'
      onClick={endPage}
      disabled={Math.floor(pages.length / 8) < page+1 || pages.length-(page+1)*8 == 0}
    > {'Конец'} </button>
  </div>


  );
};

export default Pagination;
