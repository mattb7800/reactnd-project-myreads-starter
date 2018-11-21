import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import './App.css'
import * as BooksAPI from './BooksAPI';
import Search from './Search';
import BookCase from './BookCase';

class BooksApp extends Component {
  state = {
    books: [],
    showSearchPage: false
  }

componentDidMount() {
  BooksAPI.getAll().then(books => {
    this.setState({ books });
  });
}

updateBook= (book, shelf) => {
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

////////////////////////////////////////////////////

addBook = (book, shelf) => {
        this.setState(previousState => {
            book.shelf = shelf;
            previousState.books.push(book);
            return {
                books: previousState.books
            };
        });
};
/////////////////////////////
checkIsNewBook = book => {
       const shelfBooks = this.state.books.filter(
           shelfBook => shelfBook.id === book.id
       );
       return shelfBooks.length === 0;
};
   ////we need to check if the book is new then we need to add it on the shelf  else just we need to  update the book location
   changeShelfOfBook = (book, shelf) => {
       if (this.checkIsNewBook(book)) {
           this.addBook(book, shelf);
       } else {
           this.updateBook(book, shelf);
         }

       BooksAPI.update(book, shelf);
   };

   //////Update Search status function
   updateSearchStatus = showSearchPage => {
           this.setState({ showSearchPage: true });
}

render() {
          return (

            <div className = "app" >
              <Route exact path = "/"
              render = {
                  () =>
                  <BookCase books = { this.state.books }
                  updateBook = { this.changeShelfOfBook }
                  />}
              />

                  <Route path = "/search"
                  render = { () =>
                      <Search
                      books = { this.state.books }
                      updateBook = { this.changeShelfOfBook }
                      showSearchPage = { this.updateSearchStatus }
                      />} / >

            </div>
                  );
              }
          }
export default BooksApp
