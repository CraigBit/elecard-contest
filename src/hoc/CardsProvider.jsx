import { CardsContext } from '../context/CardsContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CardsProvider = ({ children }) => {
  const [deletedCards, setDeletedCards] = useLocalStorage('cardsArray');

  return (
    <CardsContext.Provider
      value={{
        deletedCards,
        setDeletedCards,
      }}>
      {children}
    </CardsContext.Provider>
  );
};
