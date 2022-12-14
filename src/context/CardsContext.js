import { createContext } from 'react';
import { useContext } from 'react';

export const CardsContext = createContext(null);

export const useDeletedCards = () => {
  return useContext(CardsContext);
};
