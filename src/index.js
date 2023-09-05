import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DarkModeProvider } from './component/DarkModeContext';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from './features/user'
import noteReducer from './features/note'

const store =  configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkModeProvider>
  </React.StrictMode>
);

