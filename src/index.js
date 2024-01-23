import React from 'react';
import ReactDOM from 'react-dom/client';
import WrapComponent from './WrapComponent';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import signIn from './reducer/signIn';
import mainModal from './reducer/mainModal';
import addressAPIModal from './reducer/addressAPIModal';
import isAddressAPIModal from './reducer/isAddressAPIModal';
import viewProduct from './reducer/viewProduct';
import viewProductIsFlag from './reducer/viewProductIsFlag';
import cartProduct from './reducer/cartProduct';
import confirmModal from './reducer/confirmModal';
import recentlyViewProduct from './reducer/recentlyViewProduct';

let store = configureStore({
  reducer: {
    signIn,
    mainModal,
    addressAPIModal,
    isAddressAPIModal,
    viewProduct,
    viewProductIsFlag,
    cartProduct,
    confirmModal,
    recentlyViewProduct
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WrapComponent />
    </Provider>
  </React.StrictMode>
);