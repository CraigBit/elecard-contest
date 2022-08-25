import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardsProvider } from './hoc/CardsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CardsProvider>
    <App />
  </CardsProvider>
);
