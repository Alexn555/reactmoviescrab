const defaultState = {
  movies: [],
  loading: false,
  errors:{}
};

export default (state=defaultState, action={}) => {
  switch (action.type) {
    case 'FETCH_MOVIES_FULFILLED': {
      return {
        ...state,
        movies: action.payload.data.results,
        loading: false,
        errors: {}
      }
    }

    case 'FETCH_MOVIES_PENDING': {
      return {
        ...state,
        loading: true,
        errors: {}
      }
    }

    case 'FETCH_MOVIES_REJECTED': {
      return {
        ...state,
        loading: false,
        errors: { global: action.payload.status_message }
      }
    }

    default:
      return state;
  }
}
