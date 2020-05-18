import React, { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import storeReducer from './store-reducer';

const initialState = {
  loading: false,
  error: false,
  msg: '',
  lastSearchId: undefined,
  history: {}, // object with search entities (/models/search.js)
};

const Store = createContext();
export default Store;

export function StoreProvider(props) {
  const { children } = props;
  const [state, dispatch] = useReducer(storeReducer, [], () => {
    const ls = localStorage.getItem('ytbc_store');
    return (ls ? JSON.parse(ls) : initialState);
  });

  useEffect(() => {
    localStorage.setItem('ytbc_store', JSON.stringify(state));
  }, [state]);

  return (
    <Store.Provider value={[state, dispatch]}>
      {children}
    </Store.Provider>
  );
}

StoreProvider.propTypes = {
  children: PropTypes.node,
};
