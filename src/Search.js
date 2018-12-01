import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import Book from './Books';

class SearchedBooks extends Component {
  constructor(props) {
    super(props);
    this.state= {
      query: '',
      maxResults: 25,
      books: [],
      results: []
    }

  }



updateQuery = (query) => {
  this.setState({query: query}, this.searchedBooks );

}

searchedBooks () {
  if (this.state.query === '' || this.state.query === undefined) {
    return this.setState({books: []});
  } else {
    BooksAPI.search(this.state.query, this.maxResults).then(books => {
      if (Array.isArray(books)) {
        this.checkShelvesofBooks(books, this.props.books);
      }
    });
  }

};


checkShelvesofBooks = (searchedBooks, currentBooks) => {
    const shelvedBooks = searchedBooks.map(searchedBook => {
      const currentBook = currentBooks.filter(
        Book => Book.id === searchedBook.id
      )[0];
      if (currentBook) {
        searchedBook.shelf = currentBook.shelf;
      } else {
        searchedBook.shelf = 'none'
      }
      return searchedBook;
    });
    this.setState({books: shelvedBooks});
};

  render() {
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link
            className='close-search'
            to = '/'>Close</Link>
          <div className='search-books-input-wrapper'>
            <
            input type ='text'
            placeholder='Search by title or author'
            value = {this.state.query}
            onChange = {event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {this.state.books.map(book =>
              <
              Book key = {book.id}
              book = {book}
              onShelfChange ={this.props.updateBook}
              />
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchedBooks
