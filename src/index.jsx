import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader'

import App from './components/app/app';
import { configureStore } from './store/store';

const store = configureStore();
const mountNode = document.getElementById('react-app');

const Application = () => (
  <Provider store={ store }>
    <App />
  </Provider>
);

const renderApplication = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    mountNode
  );
};

renderApplication(Application);

if (module.hot) {
  module.hot.accept('./components/app/app', () => {
    renderApplication(Application)
  });
}
