import Container from 'react-bootstrap/Container';
import { CardSort } from '../components/card-sort/CardSort';
import { CardList } from '../components/card-list/CardList';
import { CardItem } from '../components/card-item/CardItem';
import { Pages } from '../ui/pagination/Pages';
import { Loader } from '../ui/loader/Loader';
import ItemService from '../api/ItemService';
import { useState, useEffect } from 'react';
import { useFetching } from '../hooks/useFetching';
import { useDeletedCards } from '../context/CardsContext';

export const CardView = () => {
  const [cards, setCards] = useState([]);
  const { deletedCards, setDeletedCards } = useDeletedCards();
  const [currentPage, setCurrentPage] = useState(1);
  const [resetCount, setResetCount] = useState(0);

  const [fetchCards, isCardsLoading, cardError] = useFetching(async () => {
    const response = await ItemService.getAll();
    if (deletedCards.length > 0) {
      let result = response.filter(
        (card) =>
          !deletedCards.find(
            (deletedCard) => deletedCard.timestamp === card.timestamp
          )
      );
      setCards(result);
    } else {
      setCards(response);
    }
  });

  useEffect(() => {
    fetchCards();
  }, []);

  const limit = 12;
  let pages = Math.ceil(cards.length / limit);

  // реагирует на счетчик сброса, срабатывает по нажатии на кнопку
  useEffect(() => {
    if (resetCount) {
      fetchCards();
    }
  }, [resetCount]);

  // сменит страницу, если на последней странице удалить все карточки
  useEffect(() => {
    if (cards.length && currentPage > pages) {
      setCurrentPage(pages);
    }
  }, [currentPage, pages, cards]);

  const callbacks = {
    // Удалить карточку
    deleteItem: (deletedItem) => {
      setCards(
        cards.filter((item) => {
          if (item.timestamp !== deletedItem.timestamp) {
            return true;
          } else {
            setDeletedCards(item, 'add');
            return false;
          }
        })
      );
    },
    // счетчик сброса фильтров и количества карточек
    increment: () => {
      setResetCount(resetCount + 1);
      setCurrentPage(1);
    },
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
          <CardSort
            setCards={setCards}
            cards={cards}
            reset={callbacks.increment}
            setCurrentPage={setCurrentPage}
          />
          <CardList
            cards={cards}
            limit={limit}
            currentPage={currentPage}
            renderCard={renders.renderCard}
          />
          <Pages
            totalPages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </Container>
  );
};
