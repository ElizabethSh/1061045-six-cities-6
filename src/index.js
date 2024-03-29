import React from 'react';
import {createRoot} from 'react-dom/client';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import {createAPI} from './services/api';
import {rootReducer} from './store/reducer/root-reducer';
import {setAuthStatus} from './store/reducer/user/action';
import {BrowserRouter} from 'react-router-dom';

export const api = createAPI(
    () => store.dispatch(setAuthStatus(false))
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

const container = document.getElementById(`root`);
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
);
