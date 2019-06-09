import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import MoviesListPage from '../movies-list-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('MoviesListPage component', () => {

 let props;
 let wrapper;
 let movieItem = { id: 1515510, title: 'Some film', poster_path: 'imgPath', popularity: 7, vote_average: 7, release_date: '2017-10-15' };
 let store = mockStore({ moviesStore: {
        movies: [movieItem],
        loading: false,
        error: {}
    }});

  beforeEach(() => {
    props = {
      moviesStore: {
        movies: [movieItem],
        loading: false,
        error: {}
      }
    };
	wrapper = mount(
		  <Provider store={store}>
			<MoviesListPage />
		  </Provider>
	 );
  });
  
  it('should render correctly', () => {
     expect(wrapper.instance()).toMatchSnapshot();
  });
  
  it("should wrapper instance to be defined", () => {
	  expect(wrapper.instance().props).toBeDefined();
  });
  
});