import Container from 'react-bootstrap/Container';
import { CardSort } from '../components/card-sort/CardSort';
import { CardList } from '../components/card-list/CardList';
import { CardItem } from '../components/card-item/CardItem';
import { Pages } from '../ui/pagination/Pages';
import { Loader } from '../ui/loader/Loader';
import ItemService from '../api/ItemService';
import { useState, useEffect } from 'react';
import { useCards } from '../context/CardsContext';
import { useFetching } from '../hooks/useFetching';

export const CardView = () => {
  const { cards, setCards } = useCards();
  const [currentPage, setCurrentPage] = useState(1);
  const [resetCount, setResetCount] = useState(0);

  const limit = 12;
  const pages = Math.ceil(cards.length / limit);

  const [fetchCards, isCardsLoading, cardError] = useFetching(async () => {
    const response = await ItemService.getAll();
    setCards(response);
  });

  // счетчик сброса фильтров и количества карточек
  const increment = () => {
    setResetCount(resetCount + 1);
  };

  useEffect(() => {
    if (!localStorage.getItem('cardsArray')) {
      fetchCards();
    }
  }, []);

  // хук реагирует на счетчик сброса, срабатывает по нажатии на кнопку
  useEffect(() => {
    if (resetCount) {
      fetchCards();
    }
  }, [resetCount]);

  const callbacks = {
    // Сменить страницу в пагинации
    changePage: (page) => setCurrentPage(page),

    // Удалить карточку
    deleteItem: (deletedItem) =>
      setCards(
        cards.filter((item) => item.timestamp !== deletedItem.timestamp)
      ),
  };

  const renders = {
    renderCard: (item) => (
      <CardItem item={item} deleteItem={callbacks.deleteItem} />
    ),
  };

  return (
    <Container>
      {cardError && <h1>Произошла ошибка ${cardError}</h1>}
      {isCardsLoading ? (
        <Loader />
      ) : (
        <>
          <CardSort reset={increment} setCurrentPage={setCurrentPage} />
          <CardList
            limit={limit}
            currentPage={currentPage}
            renderCard={renders.renderCard}
          />
          <Pages
            totalPages={pages}
            currentPage={currentPage}
            changePage={callbacks.changePage}
          />
        </>
      )}
    </Container>
  );
};
