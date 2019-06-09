import React, { Component } from 'react';
import { connect } from 'react-redux';
import MoviesListError from '../components/movies-list/movies-list-error';
import { fetchItems } from '../actions/movies-actions';

import { Button } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/movies-list/movies-list.scss';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import DateHelper from '../utils/date-helper';
import ObjectHelper from '../utils/object-helper';
import { FetchListType, ListType, ListOperations } from '../types/listTypes';
import { MOBILE_SCREEN_WIDTH } from '../types/mobileVars';
import ServerPagination from '../components/server-pagination/server-pagination';
import { FaStar, FaStarHalfAlt, FaTrashAlt } from 'react-icons/fa';

const TOTAL_LIST_PAGES = 5;

class MoviesListPage extends Component {

  state = {
	  posterStatus: '',
	  screenWidth: 0,
	  favoriteList: [],
	  watchLaterOn: false,
	  watchLaterList: [],
      selectedRow: null,
  }

  componentDidMount() {
     this.props.fetchItems(this.state.pageNumber);
	 this.updateWindowDimensions();
	 window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }
  
  updateWindowDimensions() {
	 this.setState({ screenWidth: window.innerWidth });
  }
  
  handleImageLoaded() {
     this.setState({ posterStatus: '' });
  }
  
  onAddWatchLater(e, row) {
	e.preventDefault();
	this.addRemoveItem(this.state.watchLaterList, ListType.WATCHLATER, row, ListOperations.ADD);
	return false;
  }
  
  onRemoveWatchLater(e, row) {
	e.preventDefault();
	this.addRemoveItem(this.state.watchLaterList, ListType.WATCHLATER, row, ListOperations.REMOVE);
	return false;
  }
  
  
  onAddFavorite(e, row) {
	e.preventDefault();
	this.addRemoveItem(this.state.favoriteList, ListType.FAVORITE, row, ListOperations.ADD);
	return false;
  }
  
  onRemoveFavorite(e, row) {
	e.preventDefault();
	this.addRemoveItem(this.state.favoriteList, ListType.FAVORITE, row, ListOperations.REMOVE);
	return false;
  }
  
  addRemoveItem(stateList, resList, row, actionType = ListOperations.ADD) {	  
	const curList = Object.assign([], stateList);
	const isItemInArray = ObjectHelper.checkIfItemExistsInArray(curList, row.id);
	 
	if (actionType === ListOperations.REMOVE && isItemInArray.exists) {
	    curList.splice(isItemInArray.index, 1);
	} 
	if (actionType === ListOperations.ADD && !isItemInArray.exists) {
		curList.push(row);
	}

	if (resList === ListType.FAVORITE) {
		this.setState({favoriteList: curList});
		this.refreshTable();
	} else if (resList === ListType.WATCHLATER) {
		this.setState({watchLaterList: curList});
	}
  }
  
  refreshTable() {
	  this.setState({ watchLaterOn: true });
	  setImmediate(() => { this.setState({ watchLaterOn: false }); });
  }

 
  filterSwitchWatchLater() {
	 if (this.state.watchLaterOn) {
		 return (<Button variant="outline-info" value="full-list"
                    onClick={(e) => { this.setState({ watchLaterOn: false }); 
					}}>Full list</Button>);
	 } else {
		return (<Button variant="outline-info" value="watch-later"
                    onClick={(e) => { this.setState({ watchLaterOn: true });
					}}>Only watch Later</Button>);
	 }
  }
  
  toggleOnOffWatchLater(row, isAdd) {
    if (isAdd) {
	   return (<Button variant="outline-info" value="addWatchLater"
			onClick={(e) => { this.onAddWatchLater(e, row) }}>Watch Later</Button>);
    } 
	return (<Button variant="outline-info" value="removeWatchLater"
		onClick={(e) => { this.onRemoveWatchLater(e, row) }}>
			<FaTrashAlt />
		</Button>);
  }
 
  toggleFavorite(row) {
	const curList = Object.assign([], this.state.favoriteList);
	const isItemInArray = ObjectHelper.checkIfItemExistsInArray(curList, row.id);
	if (isItemInArray.exists) {
		return (<Button variant="link" value="removeFavorite"
				onClick={(e) => { this.onRemoveFavorite(e, row) }}><FaStar /></Button>);
	} else {
		return (<Button variant="link" value="addFavorite"
				onClick={(e) => { this.onAddFavorite(e, row) }}><FaStarHalfAlt /></Button>);
	}
  }
  

   showTable() {
	   const movies = this.state.watchLaterOn ? this.state.watchLaterList : this.props.movies;
	   
       const selectRow = {
           mode: 'checkbox',
           clickToSelect: true,
           clickToEdit: false,
           onSelect: (row, isSelect, rowIndex, e) => {
			   this.setState({
				   selectedRow: row,
			   })             
           }
       };
	   
	   const formatPoster = (cell, row) => {
		 return(
			<span>
			  <img src={"https://image.tmdb.org/t/p/original/" + cell}
			   onLoad={this.handleImageLoaded()}
			   alt="Poster loading..."
			   width="100" height="80" />
			    {this.state.posterStatus}
			</span>
		 )
	   };
	   
	  const formatFavorite = (cell, row) => {
		 return(
			<div>
			 {this.toggleFavorite(row)}
			 {this.toggleOnOffWatchLater(row, true)}
			</div>
		 )
	   };
	   
	   const formatFavoriteWatchMode = (cell, row) => {
		 return(
			<div>
			 {this.toggleOnOffWatchLater(row, false)}
			</div>
		 )
	   };
	   
	   const formatReleaseDate = (cell, row) => {
		 return(
			<span>{DateHelper.parseReleaseDate(cell)}</span>
		 )
	   };

       let columns = [{
           dataField: 'id',
           text: 'ID'
       }, {
           dataField: 'title',
           text: 'Title',
           filter: textFilter(),
           sort: true,
       }, {
           dataField: 'poster_path',
           text: 'Poster',
		   formatter: formatPoster
       }, {
           dataField: 'popularity',
           text: 'Popularity',
           sort: true
       }, {
           dataField: 'vote_average',
           text: 'Vote average',
		   sort: true
       }, { // custom column to add to favorites
           dataField: 'custom_favorite',
           text: 'Favorite',
		   formatter: formatFavorite
       }, {
           dataField: 'release_date',
           text: 'Release date',
		   formatter: formatReleaseDate,
		   sort: true
       }];
	   
	   let favColumnIndex = 5;
	   
	   // add less columns for mobile version
	   if (this.state.screenWidth < MOBILE_SCREEN_WIDTH) {
		   columns = [{
			   dataField: 'poster_path',
			   text: 'Poster',
			   formatter: formatPoster
		   },{
			   dataField: 'title',
			   text: 'Title',
			   filter: textFilter(),
			   sort: true,
		   }, {
			   dataField: 'vote_average',
			   text: 'Vote average',
			   sort: true
		   }, {
			   dataField: 'custom_favorite',
			   text: 'Favorite',
			   formatter: formatFavorite
		   } ];
		   favColumnIndex = 3;
	   }
	   
	    if (this.state.watchLaterOn) {
		   columns[favColumnIndex] = { 
			  dataField: 'custom_favorite',
			  text: 'Favorite',
			  formatter: formatFavoriteWatchMode
          };
	   }
	   	   
       return (
           <div>
               <BootstrapTable keyField='id'
                               data={ movies }
                               columns={ columns }
                               headerClasses={'header-class'}
                               filter={ filterFactory() }
                               selectRow={ selectRow }
               />
           </div>
       ) 
   }

   render() {
      if (this.props.movies.length > 0) {
          return (
              <div>
			    {this.filterSwitchWatchLater()}
                {this.showTable()}
				<ServerPagination 
				  show={!this.state.watchLaterOn} 
				  fetchList={FetchListType.MOVIES}
				  totalPages={TOTAL_LIST_PAGES} />
              </div>
         );
      } 
      else {
         return(<MoviesListError movies={this.props.movies}
                       loading={this.props.loading}
                       errors={this.props.errors}
          />);
      }
   }

}

// Make contacts  array available in  props
function mapStateToProps(state) {
  return {
      movies: state.moviesStore.movies,
      loading: state.moviesStore.loading,
      errors: state.moviesStore.errors
  }
}

export default connect(mapStateToProps, {fetchItems})(MoviesListPage);
