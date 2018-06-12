import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'; 

import games from './games';

export default combineReducers({
    games,
    routing: routerReducer,
    form: formReducer
});
