import React from "react";
import { action } from 'mobx';
import "moment/locale/ru";


const Pagination = ({item}) => {
  //длина всего списка
  const totalLength = item.pagination.total;
  //номер страници
  const page = item.pagination.page;
  //меняем страницу
  const startPage = action(() => {
    item.pagination.page = 0;
    item.fetch();
  })
  const prevPage = action(() => {
    item.pagination.page -= 1;
    item.fetch();
  })
  const nextPage = action(() => {
    item.pagination.page += 1;
    item.fetch();
  })
  const endPage = action(() => {
    item.pagination.page = (totalLength%8 == 0?  Math.floor(totalLength/8) - 1 :  Math.floor(totalLength/8) );
    item.fetch();
  })
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
      disabled={Math.floor(totalLength / 8) < page+1 || totalLength-(page+1)*8 == 0}
    > {'Вперед'} </button>

    <button
      className='btn default'
      onClick={endPage}
      disabled={Math.floor(totalLength / 8) < page+1 || totalLength-(page+1)*8 == 0}
    > {'Конец'} </button>


    <span className="pagination-info"> Показано {page*8+1}-{(page*8+8)>totalLength ? totalLength : (page*8+8) } из {totalLength} </span>

  </div>


  );
};

export default Pagination;
