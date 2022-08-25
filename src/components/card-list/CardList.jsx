import { Fragment } from 'react';
import { Row } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './style.css';

export const CardList = ({ items, currentPage, limit, renderCard }) => {
  const pageEnd = currentPage * limit;
  const pageStart = pageEnd - limit;

  return (
    <Row className='g-4 mt-3 mb-4'>
      <TransitionGroup component={null}>
        {items.slice(pageStart, pageEnd).map((item) => (
          <CSSTransition key={item.timestamp} timeout={700} classNames='card'>
            <Fragment>{renderCard(item)}</Fragment>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Row>
  );
};
