import * as types from '../constants';

export default (
  state = {
    games: [],
    isWaiting: false,
  },
  action,
) => {
  switch (action.type) {
    case types.GET_GAMES_REQUEST:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_GAMES_SUCCESS:
      return {
        ...state,
        games: action.payload.fixtures,
        isWaiting: false,
      };
    case types.GET_GAMES_FAILURE:
      return {
        ...state,
        isWaiting: false,
      };
    default:
      return state;
  }
};
