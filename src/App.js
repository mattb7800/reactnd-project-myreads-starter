import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import BooksShelf from './BooksShelf'
import BooksSearch from './BooksSearch'
import './App.css'
import * as BooksAPI from './BooksAPI'

class BooksApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      booksResults: []
    }

    this.categoryNames =  [
        {
          shelfTitle: 'Currently Reading',
          shelf: 'currentlyReading'
        },
        {
          shelfTitle: 'Want to Read',
          shelf: 'wantToRead'
        },
        {
          shelfTitle: 'Read',
          shelf: 'read'
        },
        {
          shelfTitle: 'None',
          shelf: 'none'
        }
      ]

    this.updateBook = this.updateBook.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, shelf) => {
    book.shelf = shelf

    BooksAPI.update(book, shelf).then(() => {
      this.setState({
        books: this.state.books.filter(books => books.id !== book.id).concat([ book ])
      })
    })
  }

  search(query) {
    const maxResults = 30;

    BooksAPI.search(query, maxResults).then((books) => {
      if (books === undefined || books.error !== undefined) {
        this.setState({ booksResults: [] })
      } else {
        books.map(book => {
          this.state.books.forEach(userBook => {
            if (book.id === userBook.id) {
              book.shelf = userBook.shelf
            } else if (book.shelf === undefined) {
              book.shelf = 'none'
            }
          })

          return book
        })

        this.setState({ booksResults: books })
      }
    })
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter><Route exact path="/" render={() => (
          <BooksShelf
            books={this.state.books}
            onUpdateBook={this.updateBook}
            categoryNames={this.categoryNames}
          />
        )}/></BrowserRouter>

        <BrowserRouter><Route path="/search" render={({ history }) => (
          <BooksSearch
            booksResults={this.state.booksResults}
            onSearch={this.search}
            onCreateBook={this.updateBook}
          />
        )}/></BrowserRouter>
      </div>
    )
  }
}

export default BooksApp
