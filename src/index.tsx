import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from './App';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
