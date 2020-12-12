import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types'

// Reducer determines changes to an applications state according to action it receives
export default (state, action) => {
  switch(action.type){
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }

}
