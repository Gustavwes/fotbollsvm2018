import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import games from './games';
import bets from './bets';

export default combineReducers({
    games,
    bets,
    routing: routerReducer,
    form: formReducer,
});
