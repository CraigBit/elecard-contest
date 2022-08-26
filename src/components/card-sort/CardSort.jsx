import { Form, Button } from 'react-bootstrap';
import { useCards } from '../../context/CardsContext';
import { findByRegex } from '../../utils/findByRegex';

export const CardSort = ({ reset, setCurrentPage }) => {
  const { cards, setCards } = useCards();

  const callbacks = {
    // По дате
    sortByDate: () => {
      setCards([...cards].sort((a, b) => a.timestamp - b.timestamp));
      setCurrentPage(1);
    },

    // По размеру файла
    sortByFileSize: () => {
      setCards([...cards].sort((a, b) => a.filesize - b.filesize));
      setCurrentPage(1);
    },

    // По категории
    sortByCategory: () => {
      setCards([...cards].sort((a, b) => a.category.localeCompare(b.category)));
      setCurrentPage(1);
    },

    // По имени
    sortByName: () => {
      const sortedList = cards.sort((a, b) => {
        const firstItem = findByRegex(a.image);
        const secondItem = findByRegex(b.image);
        return firstItem.localeCompare(secondItem);
      });
      setCards([...sortedList]);
      setCurrentPage(1);
    },
  };

  return (
    <Form>
      <Form.Group
        className='border border-secondary rounded p-3 mt-5'
        controlId='formGroupEmail'>
        <legend>Сортировать по:</legend>
        <Form.Group className='d-flex align-items-center'>
          <Form.Group>
            <Form.Check
              inline
              label='Названию'
              value='byName'
              name='sortCards'
              type='radio'
              id='name-sort'
              role='button'
              onChange={callbacks.sortByName}
            />
            <Form.Check
              inline
              label='Дате'
              value='byDate'
              name='sortCards'
              type='radio'
              id='date-sort'
              role='button'
              onChange={callbacks.sortByDate}
            />
            <Form.Check
              inline
              label='Категории'
              value='byCategory'
              name='sortCards'
              type='radio'
              id='category-sort'
              role='button'
              onChange={callbacks.sortByCategory}
            />
            <Form.Check
              inline
              label='Размеру файла'
              value='bySize'
              name='sortCards'
              type='radio'
              id='size-sort'
              role='button'
              onChange={callbacks.sortByFileSize}
            />
          </Form.Group>
          <Button variant='primary' type='reset' onClick={reset}>
            Сброс
          </Button>
        </Form.Group>
      </Form.Group>
    </Form>
  );
};
