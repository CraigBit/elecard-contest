import { Form, Navbar } from 'react-bootstrap';
import '../../App.css';

export const Layout = ({ children, setView, view }) => {
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
              value='tree'
              name='changeView'
              type={'radio'}
              role='button'
              id='tree-view'
              onChange={() => setView('tree')}
            />

            <Form.Check
              inline
              checked={view === null}
              label='Карточки'
              value='cards'
              name='changeView'
              type={'radio'}
              role='button'
              id='cards-view'
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
