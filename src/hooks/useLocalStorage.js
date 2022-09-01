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

  const setValue = (value, order) => {
    try {
      if (order === 'add') {
        storedValue.push(value);
        // Сохраняем в локальное хранилище
        localStorage.setItem(storageKey, JSON.stringify(storedValue));
        // Устанавливаем состояние
        setStoredValue(storedValue);
      } else if (order === 'clean') {
        localStorage.removeItem(storageKey);
        setStoredValue([]);
      }
    } catch (error) {
      // Вывод ошибки
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
