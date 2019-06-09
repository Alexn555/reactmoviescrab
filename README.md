# React Bee work component using redux

This a basic react table workbook

v 1.2
 Added server side prev, next button
 Added small fixes

v 1.1
 Fixed: scss now instead of css
 Added server side pagination
 Added server side sort direction


##  How to install

```bash
# Install dependencies
cd reactspeedtable
npm install
```
Main plot
 Uses classical redux pattern, with store and reducers.
 Uses axios for backend http client to get backend movies information.
 
## How to test
Currently using react-scripts build-in test tool based on jest with test help of enzyme.
Tests are commonly spread among component folders 
Exm. utils tests are in folder  utils/test this way, in my opinion, is more comfortable for importing 
required files

cmd -> npm run test

 
## How to run

### The backend server
Backend data is coming from https://uxcandy.com/~shapoval/test-task-backend/?developer=Name

```bash
npm start
This will run the client at localhost:3000
 Check the page in desired Browser

 Best viewed in Firefox, Chrome

 # Table libraries
  Uses react-bootstrap-table-next as base and filter react-bootstrap-table2-filter
 CSS  Semantic UI for headers, messages like Loading, Error no data
      Bootstrap 4 for table component and override component
	  
	Plot
   Uses redux pattern.
   Consists of components: list 
   And actions with reducers
   
     Libraries: 
	  react-bootstrap
	  react-bootstrap-table 2 for table 
	  axios - http client
	  node-sass - sass
	  sass-loader
	  semantic-ui-css - similar to boostrap
	  sfcookies - for future small settings savings
   
     Scheme:  
	   Contents
	    pages - pages of application
	    actions - redux signals that help call other components
	    components - required for pages components
		types - enums, lists, constants
	    reducers - redux building blocks of handling state change with business logic
	    utils - utility classes like date parser, object handler
		App.js - main page declaration and volume toggle
	    store.js - redux store
	    index.js - starting point whole application
	    setupTests - setuo enzyme adapter
		tests are spread among folders 
		
		App ->  movies-list-page (handles movies (popular) list using react-bootstrap-table 2)) 
		         it uses component server-pagination that handles pagination and pagination will
				 request any other page from  server	
                also some utility classes are used like data parser to format date in other locale format
    			By pressing star you will add movies to favorites. You can unselect from favorites.
				By pressing Watch Later you will add movies to watch later list 
				  And to view Watch Later list you just need to press Only Watch Later which is on top.
				You also can adjust width, so in mobile app looks good.
		    
	   
	To view online
   http://norwaydict.com/reactmoviecrab
      Click on any link in the page 
	  (it will for now mask as norwaydict main site hrefs, but it works as expected)
	  
	  
  Enjoy the app and do call if you have some feedback. 
  Thanks for the task!
  



