import React from 'react';
import BookStore from '../models/BookStore'

const Book = (b) => (
  <li className="list-group-item" key={b._id}>{b.title}: {b.info}</li>
)

function Books() {
  var books = BookStore.books
  //console.log(JSON.stringify(books))
  return (
    <div>
      <h1>Books</h1>
      <ul className="list-group">{books.map(Book)}</ul>
    </div>
  )
}



export default Books;