import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './BookCase'
import Search from './Search'


class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({books});
    });
  }
// Place Book on shelf //
  updateBook = (book, shelf) => {
    this.setState(previousState => {
      if (shelf === 'none') {
        return {
          books: previousState.books.filter(
            currentBook => currentBook.id !== book.id
          )
        };
      }
      return {
        books: previousState.books.map(currentBook => {
          if (currentBook.id === book.id) {
            currentBook.shelf = shelf;
          }
          return currentBook;
        })
      };
    });
  };
/// add book ////
  addBook = (book, shelf) => {
    this.setState(previousState => {
      book.shelf = shelf;
      previousState.books.push(book);
      return {
        books: previousState.books
      };
    });
  };
// using filter method to check if book is new //
checkIsNewBook = book => {
  const shelfBooks = this.state.books.filter(
    shelfBook => shelfBook.id === book.id
  );
  return shelfBooks.length === 0;
};


changeShelfOfBook = (book, shelf) => {
    if(this.checkIsNewBook (book)) {
      this.addBook(book, shelf);
    } else {
      this.updateBook(book, shelf);

    }
    BooksAPI.update(book, shelf);
  };

  updateSearchStatus = showSearchPage => {
    this.setState({showSearchPage: true});
  }
  render() {
    return (
      <div className= 'app'>
      <BrowserRouter><Route exact path ='/'
      render= {() =>
        <BookCase
        books = {this.state.books}
        updateBook ={this.changeShelfOfBook}
        />
      }/></BrowserRouter>

      <BrowserRouter><Route path = '/search'
      render = {() =>
        <Search
        books = {this.state.books}
        updateBook = {this.changeShelfOfBook}
        showSearchPage = {this.updateSearchStatus}
        />
      }/></BrowserRouter>
      </div>
    );

  }
}

export default BooksApp
