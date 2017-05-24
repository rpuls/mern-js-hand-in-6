let router = require("express").Router()
const jwt = require("jsonwebtoken")
const secret = require('../models/secrets')
let Book = require('../models/Book')
let User = require('../models/User')
const expireMs = 30 * 60 * 1000

router.get("/", (req, res) => {
  res.json({ msg: "Hello World" })
})


//get all books
router.get('/books', function (req, res, next) {
  Book.find({}, function (err, books) {
    if (err) throw err
    let arr = books
    let j = JSON.stringify(arr)
    res.send(j)
  })
})

//get book by id
router.get('/books/:id', function (req, res, next) {
  Book.findById({ _id: req.params.id }, function (err, book) {
    if (err) throw err
    let j = JSON.stringify(book)
    res.send(j)
  })
})

const authorize = function (req, callback) {
  req.headers.authorization
}

//add book 
router.post("/book", function (req, res, next) {
  var book = req.body
  Book.create(book, function (err, book) {
    if (err) throw err
    console.log()
    res.json(book)
  })
})

//update book option 2
router.put("/book/:id", function (req, res, next) {
  var id = req.params.id
  var book = JSON.stringify(req.body)
  Book.findOneAndUpdate({ _id: id }, { book }, function (err, book) {
    if (err) throw err
    console.log(book)
    res.json(book)
  })
})

//Delete book
router.delete('/book/:id', function (req, res, next) {
  Book.findByIdAndRemove(req.params.id, function (err) {
    if (err) throw err
    console.log('book successfully removed!')
    res.status(204).send()
  })
})

//add user
router.post("/user", function (req, res, next) {
  var user = req.body
  User.create(user, function (err, user) {
    if (err) throw err
    console.log()
    res.status(200).send()
  })
})

//login
router.post('/login', function (req, res, next) {
  const user = req.body
  console.log(`login ${user}`)
  User.findOne({ 'userName': user.userName }, function (err, u) {
    if (err) throw err
    u.comparePassword(user.password, function (err, isMismatch) {
      const expireInMs = Date.now() + expireMs
      const payload = { iss: "bookstore.com", sub: user.userName, exp: expireInMs }
      const token = jwt.sign(payload, secret)
      res.status(200).json(token)
    })
  })
})

module.exports = router

