import { Form, Navbar } from 'react-bootstrap';
import '../../App.css';

export const Layout = ({ children, setView }) => {
  return (
    <>
      <Navbar
        bg='secondary'
        variant='dark'
        sticky='top'
        className='p-3 d-flex justify-content-between'>
        <Navbar.Brand>Lorem ipsum dolor sit amet.</Navbar.Brand>
        <Form className='bg-light px-4'>
          <Form.Group>
            <Form.Check
              inline
              label='Список'
              value='treeList'
              name='changeView'
              type={'radio'}
              id={`name-sort`}
              onChange={() => setView('tree')}
            />

            <Form.Check
              inline
              label='Карточки'
              value='cards'
              name='changeView'
              type={'radio'}
              id={`name-sort`}
              onChange={() => setView(null)}
            />
          </Form.Group>
        </Form>
      </Navbar>
      {children}
      <Navbar
        bg='secondary'
        variant='dark'
        className='p-3 mt-auto'
        sticky='bottom'>
        <Navbar.Brand>Lorem ipsum dolor sit amet.</Navbar.Brand>
      </Navbar>
    </>
  );
};
