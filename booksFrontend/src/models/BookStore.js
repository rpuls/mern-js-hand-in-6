import { observable, action, useStrict, extendObservable } from 'mobx'
const backendURL = "http://localhost:7777/"
const booksURL = `${backendURL}books`

//DataStore for this Demo
class BookStore {

  @observable books = []; //this "@ syntax"" is experimental for the moment and might not work in the future.

  constructor() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    fetch(booksURL)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        this.books = response
        if (this._observer) {
          this._observer.dataReady()
        }
      })
  }

  getBook(id) {
    return this.books.filter((book) => {
      return book.id === Number(id)
    })[0]
  }

  addDummyBooks = (book) => {
    this.books.push(book)
  }

  addBook = (book) => {
    var self = this
    fetch(booksURL,
      {
        method: 'POST',
        body: JSON.stringify(book),
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        mode: 'no-cors'
      })
      .then(() => {
        self.fetchBooks()
      })
  }

}

export default new BookStore()