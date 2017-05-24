import React from 'react';
import BookStore from '../models/BookStore'

const Book = (b) => (
  <li key={b._id}>{b.title}: {b.info}</li>
)

function Books() {
  var books = BookStore.books
  console.log(JSON.stringify(books))
  return (
    <div>
      <h1>Books</h1>
      <ul>{books.map(Book)}</ul>
    </div>
  )
}



export default Books;