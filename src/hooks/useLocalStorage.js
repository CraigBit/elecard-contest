import { useState } from 'react';

function returnInitialState(storageKey) {
  try {
    // Проверить локальное хранилище по ключу
    const item = window.localStorage.getItem(storageKey);
    // Распарсить JSON или вернуть пустой массив
    return item ? JSON.parse(item) : [];
  } catch (error) {
    // При ошибке также вернуть пустой массив
    console.log(error);
    return [];
  }
}

export function useLocalStorage(storageKey) {
  const [storedValue, setStoredValue] = useState(() =>
    returnInitialState(storageKey)
  );

  const setValue = (value) => {
    try {
      // Проверяем, что лежит в значении
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Сохраняем в локальное хранилище
      window.localStorage.setItem(storageKey, JSON.stringify(valueToStore));
      // Устанавливаем состояние
      setStoredValue(valueToStore);
    } catch (error) {
      // Вывод ошибки
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
