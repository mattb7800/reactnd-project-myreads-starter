import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './BookCase'
import SearchedBooks from './Search'


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
// Good info on using previousState: //
// https://teamtreehouse.com/community/react-docs-now-recommends-using-function-with-prevstate-inside-of-setstate //
  updateBook = (book, shelf) => {
    this.setState(prevState => {
      if (shelf === 'none') {
        return {
          books: prevState.books.filter(
            currentBook => currentBook.id !== book.id
          )
        };
      }
      return {
        books: prevState.books.map(currentBook => {
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
    this.setState(prevState => {
      book.shelf = shelf;
      prevState.books.push(book);
      return {
        books: prevState.books
      };
    });
  };
// using filter method to check if book is new //
checkForNewBook = book => {
  const shelfBooks = this.state.books.filter(
    shelfBook => shelfBook.id === book.id
  );
  return shelfBooks.length === 0;
};


updateShelfOfBook = (book, shelf) => {
    if(this.checkForNewBook (book)) {
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
      <Route exact path ='/'
      render= {() =>
        <BookCase
        books = {this.state.books}
        updateBook ={this.updateShelfOfBook}
        />
      }/>

      <Route path = '/search'
      render = {() =>
        <SearchedBooks
        books = {this.state.books}
        updateBook = {this.updateShelfOfBook}
        showSearchPage = {this.updateSearchStatus}
        />
      }/>
      </div>
    );

  }
}

export default BooksApp
