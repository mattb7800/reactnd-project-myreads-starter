import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import Book from './Books';
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'

class SearchedBooks extends Component {
  constructor(props) {
    super(props);
    this.state= {
      query: '',
      maxResults: 25,
      books: [],

    }

  }



updateQuery = (query) => {
  this.setState({query: query})

   if(query !== null ||  query !== 'undefined'){
     this.searchedBooks(query);

  // Check for Query = invalid or nothing and we want empty array//
   } else {
     return this.setState({books: []})
   }
}

searchedBooks = (query) => {
  if (query){
    BooksAPI.search(query, this.maxResults).then((books) => {
      if (Array.isArray(books)) {
        this.checkShelvesofBooks(books, this.props.books);
      } else {
        this.setState({books: []});
      }
    })
    .catch((err) => {
      console.log('[BooksAPI.search() error]: ' + err);
    })

  }else {
    this.setState({books: []})
  }
}


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
            onChange = {(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className='search-books-results'>
          {this.state.query && this.state.books.length===0 && (
            <p>No Results Matching Search Criteria</p>
          )}
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
