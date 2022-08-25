import Container from 'react-bootstrap/Container';
import { CardList } from '../components/card-list/CardList';
import { CardItem } from '../components/card-item/CardItem';
import { Pages } from '../ui/pagination/Pages';
import { useState } from 'react';
import { findByRegex } from '../utils/findByRegex';
import { CardSort } from '../components/card-sort/CardSort';
import { useCards } from '../context/CardsContext';

export const CardView = ({ inc }) => {
  const { cards, setCards } = useCards();
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 12;
  const pages = Math.ceil(cards.length / limit);

  const callbacks = {
    // Сменить страницу в пагинации
    changePage: (page) => setCurrentPage(page),

    // Удалить карточку
    deleteItem: (deletedItem) =>
      setCards(
        cards.filter((item) => item.timestamp !== deletedItem.timestamp)
      ),

    // Сортировки
    // По дате
    sortByDate: () => {
      setCards([...cards].sort((a, b) => a.timestamp - b.timestamp));
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

    // По размеру файла
    sortByFileSize: () => {
      const sortedList = cards.sort((a, b) => a.filesize - b.filesize);
      setCards([...sortedList]);
      setCurrentPage(1);
    },

    // По категории
    sortByCategory: () => {
      setCards([...cards].sort((a, b) => a.category.localeCompare(b.category)));
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
      <CardSort
        reset={inc}
        nameSort={callbacks.sortByName}
        dateSort={callbacks.sortByDate}
        sizeSort={callbacks.sortByFileSize}
        categorySort={callbacks.sortByCategory}
      />

      <CardList
        limit={limit}
        currentPage={currentPage}
        items={cards}
        renderCard={renders.renderCard}
      />
      <Pages
        totalPages={pages}
        currentPage={currentPage}
        changePage={callbacks.changePage}
      />
    </Container>
  );
};
