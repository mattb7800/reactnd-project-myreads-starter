import React, { Component } from 'react'
//import * as BooksAPI from './BooksAPI'
import Book from './Books';

class BookShelf extends Component {
  //state = {}

  render() {
    return (
      <div className='bookshelf' key = {this.props.shelf.id}>
        <h2 className='bookshelf-title'>{this.props.shelf.name}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>{
            this.props.books.map(book =>
              <
              Book key= {book.id}
              book = {book}
              onShelfChange = {this.props.updateBook}
              />
            )
          }

          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
