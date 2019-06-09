import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { fetchItems } from '../movies-actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const fetchMovies = (page) => ({
  type: 'FETCH_MOVIES',
  page
});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  });
  
  it('should send FETCH_MOVIES action and get correct snapshot', () => {
	const store = mockStore({ movies: [], loading: [], errors: [] });
	const page = 1;
    store.dispatch(fetchMovies(page));
    expect(store.getActions()).toMatchSnapshot();
  });
  
  it('should send FETCH_MOVIES action and get right actions', () => {
    fetchMock.getOnce('/movies', {
      body: { payload: ['something'] },
      headers: { 'content-type': 'application/json' }
    });
	const page = 1;

    const expectedActions = [
      { type: 'FETCH_MOVIES', page: 1 } 
    ];
	
    const store = mockStore({ movies: [], loading: [], errors: [] });
	store.dispatch(fetchMovies(page));
    expect(store.getActions()).toEqual(expectedActions);
  });
  
  
})




