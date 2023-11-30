// import global styles
import './styles/index.scss';

// import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './components/app/App.tsx';
import 'focus-visible';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>,
);
