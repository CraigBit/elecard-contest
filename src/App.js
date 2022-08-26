import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { CardView } from './views/CardView';
import { useFetching } from './hooks/useFetching';
import { Loader } from './ui/loader/Loader';
import ItemService from './api/ItemService';
import { useCards } from './context/CardsContext';
import { TreeView } from './views/TreeView';

function App() {
  const { setCards } = useCards();
  const [resetCount, setResetCount] = useState(0);
  const [view, setView] = useState(null);

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

  return (
    <Layout setView={setView} view={view}>
      {cardError && <h1>Произошла ошибка ${cardError}</h1>}
      {isCardsLoading ? (
        <Loader />
      ) : (
        <>{view !== 'tree' ? <CardView inc={increment} /> : <TreeView />}</>
      )}
    </Layout>
  );
}

export default App;
