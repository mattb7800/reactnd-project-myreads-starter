import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf';

class BookCase extends Component {
  state = {
    //Define Shelf Names within Bookcase
      bookShelves: [
        {id: 'currentlyReading', name: 'Currently Reading'},
        {id: 'wantToRead', name: 'Want to Read'},
        {id: 'read', name: 'Read'}
      ]
  };

putBooksOnShelf = shelf => {
  return this.props.books.filter(book => shelf.id === book.shelf);
};

  render() {
    return (

      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <div>
            {this.state.bookShelves.map(shelf =>
              <
              BookShelf key = {shelf.id}
              shelf = {shelf}
              books = {this.putBooksOnShelf(shelf)}
              updateBook = {this.props.updateBook}
              />
              )
            }
          </div>
        </div>
        <div className='open-search'>
          <Link to = '/search'>Add a Book</Link>
        </div>
      </div>


    );
  }
}

export default BookCase;
