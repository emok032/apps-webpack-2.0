// (index.js) Dependencies
//		3rd Party Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
//		My App Modules
import reducers from './reducers';
import Routes from './router';
import '../style/materialize.css';
import '../style/react-range.css';
import '../style/style.css';

console.log("Hi webpack dev server");

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
