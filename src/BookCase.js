import React, { Component } from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom'
class BookCase extends React.Component {
  state = {
    bookShelves: [
      {id: 'currentlyReading', title: 'Currently Reading'},
      {id: 'wantToRead', title: 'Plan to Read'},
      {id: 'read', title:'Already Read'}
    ]

  };
  getBooksByFilterShelf = shelf => {
    return this.props.books.filter(book => shelf.id === book.shelf);
  };



  render() {
    return(

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {this.state.bookShelves.map(shelf =>
                <
                shelf key = { shelf.id}
                shelf = {shelf}
                books =  {this.getBooksByFilterShelf(shelf)}
                updateBook = {this.props.updateBook}
                />

              )}

            </div>
          </div>
        <div className="open-search">
          <Link to = '/Search'>add book</Link>
        </div>
        </div>


    );
  }
}

export default BookCase;
