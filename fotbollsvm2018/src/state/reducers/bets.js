import * as types from '../constants';

export default (
    state = {
        bets: {},
    },
    action,
) => {
    switch (action.type) {
    case types.GET_BETS:
        return {
            ...state,
            bets: action.payload,
        };
    default:
        return state;
    }
};
