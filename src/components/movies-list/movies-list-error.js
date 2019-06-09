import React from 'react';
import { Message, Icon } from 'semantic-ui-react';
import './movies-list.scss';

export default function MoviesListError({movies, loading, errors}){

    const loadingMessage = (
      <Message icon info>
        <Icon name='circle notched' loading />
        <Message.Content>
           <Message.Header>Loading...</Message.Header>
		   <p>Please wait.</p>
       </Message.Content>
      </Message>
  )

  const emptyMessage = (
      <Message icon info>
        <Icon name='warning circle' />
        <Message.Content>
           <Message.Header>No Movies Found</Message.Header>
           <p>No data found</p>
       </Message.Content>
      </Message>
  )

  const timeoutMessage = (
      <Message icon negative>
        <Icon name='wait' />
        <Message.Content>
           <Message.Header>{errors.global}</Message.Header>
           Is the backend server running?
       </Message.Content>
      </Message>
  )

  return (
      <div>
          { loading && loadingMessage }
          { movies.length === 0 && !loading  && !errors.global && emptyMessage }
          { errors.global && timeoutMessage }
      </div>
  )
}
