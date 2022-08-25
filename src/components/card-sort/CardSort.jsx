import { Form, Button } from 'react-bootstrap';

export const CardSort = ({
  nameSort,
  dateSort,
  sizeSort,
  categorySort,
  reset,
}) => {
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
              type={'radio'}
              id={`name-sort`}
              onChange={nameSort}
            />
            <Form.Check
              inline
              label='Дате'
              value='byDate'
              name='sortCards'
              type={'radio'}
              id={`date-sort`}
              onChange={dateSort}
            />
            <Form.Check
              inline
              label='Категории'
              value='byCategory'
              name='sortCards'
              type={'radio'}
              id={`category-sort`}
              onChange={categorySort}
            />
            <Form.Check
              inline
              label='Размеру файла'
              value='bySize'
              name='sortCards'
              type={'radio'}
              id={`size-sort`}
              onChange={sizeSort}
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
