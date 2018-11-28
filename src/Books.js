import React, {Component} from 'react'
// import * as BooksAPI from './BooksAPI'
//import Changer from './Changer'

class Book extends Component {
  // state = {}
  handleChange = event => {this.props.onShelfChange(this.props.book, event.target.value);
  };

  render() {
    const backGroundImage = this.props.book.imageLinks && this.props.book.imageLinks.thumbnail;
    return (
      <li>
          <div className='book'>
            <div className='book-top'>
              <div
                className='book-cover'
                style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${backGroundImage})`
              }}>
                <div className = 'book-shelf-changer'>
                  <select defaultValue = { this.props.book.shelf }
                    onChange = { this.handleChange } >
                    <option value='move' disabled>Move to...</option>
                    <option value='currentlyReading'>Currently Reading</option>
                    <option value='wantToRead'>Want to Read</option>
                    <option value='read'>Read</option>
                    <option value='none'>None</option>
                  </select>
                </div>
              </div>

            </div>
            <div className='book-title'>{this.props.book.title}</div>
            <div className='book-authors'>{this.props.book.authors}</div>
          </div>
      </li>
    )
  }

}

export default Book;
