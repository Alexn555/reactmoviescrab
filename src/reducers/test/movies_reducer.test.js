import reducer from '../movies-reducer';

describe('movies reducer', () => {
  const initState = {
	 movies: [],
	 loading: false,
	 errors:{}
  };
   
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        movies: [],
		loading: false,
		errors:{}
      }
    )
  });
  
  it('returns the correct state on success', () => {
    const action = { type: 'FETCH_MOVIES', payload: 1 };
    const expectedRes = { movies: [], loading: false, errors: {} };

    expect(reducer(undefined, action)).toEqual(expectedRes);
  });
  
  it('handles FETCH_MOVIES PENDING', () => {
	  const action = { type: 'FETCH_MOVIES_PENDING', payload: 1 };	  
	  const expectedRes = { movies: [], loading: true, errors: {} };
	  
      expect(reducer(initState, action)).toEqual(expectedRes);
  });
  
  it('returns the correct state on error', () => {
    const action = { type: 'FETCH', payload: 1 };
    const expectedRes = { movies: [], loading: false, errors: {} };

    expect(reducer(undefined, action)).toEqual(expectedRes);
  });
 
  
})