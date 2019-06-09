import { client } from './';

const apiKey = '67aeed398efbb2e1a3d33ea43395c16f';
const locale = 'en-US';

export function fetchItems(page = 1){
  return dispatch => {
    dispatch({
      type: 'FETCH_MOVIES',
      payload: client.get('3/movie/popular?api_key='+apiKey+'&language='+locale+'&page='+page)
    })
  }
}


