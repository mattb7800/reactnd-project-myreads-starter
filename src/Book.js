import React from 'react'
import PropTypes from 'prop-types'

const Book = (props) => {
  const { onUpdateBook, book } = props

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks.thumbnail})`
          }}></div>
          <div className="book-shelf-changer">
            <select
              onChange={(event) => onUpdateBook(book, event.target.value)}
              value={book.shelf}>
              <option value="disabled" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors !== undefined && (
          book.authors.map((author, key) => (
            <div key={key} className="book-authors">{author}</div>
          ))
        )}
      </div>
    </li>
  )
}

Book.propTypes = {
  onUpdateBook: PropTypes.func,
  book: PropTypes.object.isRequired
}

export default Book
