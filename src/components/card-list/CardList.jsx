import { Fragment } from 'react';
import { Row } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './style.css';

export const CardList = ({ currentPage, limit, renderCard, cards }) => {
  const pageEnd = currentPage * limit;
  const pageStart = pageEnd - limit;

  // console.log(cards.slice(pageStart, pageEnd));

  return (
    <Row sm={2} lg={3} xl={4} className='g-4 mt-3 mb-4'>
      <TransitionGroup component={null}>
        {cards.slice(pageStart, pageEnd).map((card) => (
          <CSSTransition key={card.timestamp} timeout={700} classNames='card'>
            <Fragment>{renderCard(card)}</Fragment>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Row>
  );
};
