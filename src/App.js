import React from 'react';
import { Provider } from 'react-redux'
import store from './store/configureStore'
import Home from './features/Home'

const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
