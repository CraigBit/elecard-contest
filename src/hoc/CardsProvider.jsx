import { CardsContext } from '../context/CardsContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useLocalStorage('cardsArray');

  return (
    <CardsContext.Provider
      value={{
        cards,
        setCards,
      }}>
      {children}
    </CardsContext.Provider>
  );
};
