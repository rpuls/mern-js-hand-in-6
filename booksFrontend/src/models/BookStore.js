const backendURL = "http://localhost:7777/"
const booksURL = `${backendURL}books`

//DataStore for this Demo
class BookStore {

  constructor() {
    this._books = []
    //this.fetchBooks()
    this._observer = null
  }

  fetchBooks = () => {
    fetch(booksURL)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        this._books = response
        if (this._observer) {
          this._observer.dataReady()
        }
      })
  }


  subscribe(observer) {
    this._observer = observer
  }

  get books() {
    this.fetchBooks()
    return this._books
  }

  getBook(id) {
    return this._books.filter((book) => {
      return book.id === Number(id)
    })[0]
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