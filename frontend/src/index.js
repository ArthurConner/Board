import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router} from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import peopleReducer from './reducers'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
 


const store = createStore(
    peopleReducer,

    composeEnhancers(
      applyMiddleware(thunk,logger)
   )
   )

ReactDOM.render(
  
    <Provider store={store}>
     <Router>
       <App />
     </Router>
   </Provider>
     ,
     document.getElementById('root')
   );

registerServiceWorker();
