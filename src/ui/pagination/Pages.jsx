import { Pagination } from 'react-bootstrap';

export const Pages = ({ totalPages, currentPage, changePage }) => {
  const indent = 1;
  // Номера слева и справа относительно активного номера, которые остаются видимыми
  let left = Math.max(currentPage - indent, 1);
  let right = Math.min(left + indent * 2, totalPages);
  // Корректировка, когда страница в конце
  left = Math.max(right - indent * 2, 1);

  let pagesArray = [];
  // Первая страница
  if (left > 1) pagesArray.push(1);
  // Пропуск
  if (left > 2) pagesArray.push(null);
  // Страницы в середине
  for (let page = left; page <= right; page++) pagesArray.push(page);
  // Пропуск
  if (right < totalPages - 1) pagesArray.push(null);
  // Последняя страница
  if (right < totalPages) pagesArray.push(totalPages);

  return (
    <Pagination className='d-flex justify-content-end mb-4'>
      {pagesArray.map((page, index) => {
        if (currentPage === page) {
          return (
            <Pagination.Item
              onClick={() => changePage(page)}
              key={index}
              active>
              {page}
            </Pagination.Item>
          );
        } else if (!page) {
          return (
            <Pagination.Ellipsis key={index} disabled>
              {page}
            </Pagination.Ellipsis>
          );
        } else {
          return (
            <Pagination.Item onClick={() => changePage(page)} key={index}>
              {page}
            </Pagination.Item>
          );
        }
      })}
    </Pagination>
  );
};
