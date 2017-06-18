import React from 'react'
import { observer } from 'mobx-react'
import BookStore from '../models/BookStore'

const Book = (b) => (
  <li className="list-group-item" key={b._id}>{b.title}: {b.info}</li>
)

function addbook() {
  BookStore.addDummyBooks({_id: "id123", title: "Observable", info: "demonstration" })
}

@observer
class Books extends React.Component {
  render() {
    return (
      <div>
        <h1>Books</h1>
        <ul className="list-group">{this.props.books.map(Book)}</ul>
        <button onClick={addbook} >Demo observable</button>
      </div>
    )
  }
}



export default Books;