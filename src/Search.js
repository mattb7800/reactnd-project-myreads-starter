import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import Book from './Books';

class Search extends Component {
  state= {
    query: '',
    maxResults: 20,
    books: []
  };


updateQuery = (query) => {
  this.setState({query: query});
  this.Search(query);
}
///////////////////////////
Search = (query) => {
  if (query === '') {
    this.setState({books: []});
  } else {
    BooksAPI.search(query, this.maxResults).then(books => {
      if (Array.isArray(books)) {
        this.checkShelvesofBooks(books, this.props.books);
      }
    });
  }
};

checkShelvesofBooks = (Search, currentBooks) => {
    const shelvedBooks = Search.map(search => {
      const currentBook = currentBooks.filter(
        Book => Book.id === Search.id
      )[0];
      if (currentBook) {
        Search.shelf = currentBook.shelf;
      } else {
        Search.shelf = 'none'
      }
      return Search;
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
            placeholder='Search by title or auther'
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
export default Search
