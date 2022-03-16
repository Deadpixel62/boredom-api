import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import Reducer from './reducers/reducer'
import { BrowserRouter } from "react-router-dom";

const store = createStore(Reducer)

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
