import {
  // getRandomIntInclusive,
  loadFromStorage,
  makeId,
  makeLorem,
  saveToStorage,
} from "./util.service.js"

import { getRandomIntInclusive } from "./util.service.js"

// import * as utilService from './util.service.js'

import { storageService } from "./async-storage.service.js"

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
  addReview,
  addBook,
}

const book_KEY = "bookDB"

function query(filterBy = {}) {
  return storageService.query(book_KEY).then((books) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i")
      books = books.filter((book) => regExp.test(book.title))
    }
    if (filterBy.minPrice) {
      books = books.filter((book) => book.listPrice.amount >= filterBy.minPrice)
    }
    console.log(books)
    return books
  })
}

function get(bookId) {
  return storageService.get(book_KEY, bookId).then(_setNextPrevBookId)
}

function remove(bookId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(book_KEY, bookId)
}

function save(book) {
  return storageService
    .get(book_KEY, book.id)
    .then(() => storageService.put(book_KEY, book))
    .catch(() => storageService.post(book_KEY, book))

  // console.log("Saved book:", book)
  // bookService.query().then((books) => console.log("All books now:", books))
}

function addReview(bookId, review) {
  return get(bookId).then((book) => {
    if (!book.reviews) book.reviews = []
    book.reviews.push(review)
    return save(book)
  })
}

function addBook(book) {
  return query().then((bookList) => {
    console.log("Trying to add book with ID:", book.id)
    const exists = bookList.some((b) => b.title === book.title)
    console.log("Already exists?", exists)

    if (exists) return Promise.reject("Book already exists")

    if (!book.listPrice) {
      book.listPrice = {
        amount: getRandomIntInclusive(20, 300),
        currencyCode: "EUR",
        isOnSale: false,
      }
    }
    if (!book.thumbnail) {
      book.thumbnail = "http://ca.org/books-photos/20.jpg"
    }
    return save(book)
  })
}

function getEmptyBook(title = "", amount = "") {
  return {
    id: makeId(),
    title,
    description: "",
    thumbnail: "",
    listPrice: {
      amount,
      currencyCode: "EUR",
      isOnSale: false,
    },
  }
}

function getDefaultFilter() {
  return { txt: "", minSpeed: "" }
}

function _createBooks() {
  let books = loadFromStorage(book_KEY)
  if (!books || !books.length) {
    books = [
      _createBook("Harry Potter", 120),
      _createBook("The Hobbit", 95),
      _createBook("mitAtomic Habitssu", 80),
    ]
    saveToStorage(book_KEY, books)
  }
}

// function _createBooks() {
//   const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
//   const books = []
//   for (let i = 0; i < 20; i++) {
//       const book = {
//           id: utilService.makeId(),
//           title: utilService.makeLorem(2),
//           subtitle: utilService.makeLorem(4),
//           authors: [
//               utilService.makeLorem(1)
//           ],
//           publishedDate: utilService.getRandomIntInclusive(1950, 2024),
//           description: utilService.makeLorem(20),
//           pageCount: utilService.getRandomIntInclusive(20, 600),
//           categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
//           thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
//           language: "en",
//           listPrice: {
//               amount: utilService.getRandomIntInclusive(80, 500),
//               currencyCode: "EUR",
//               isOnSale: Math.random() > 0.7
//           }
//       }
//       books.push(book)
//   }
//   console.log('books', books)
// }

function _setNextPrevBookId(book) {
  return query().then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevBook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1]

    book.nextBookId = nextBook.id
    book.prevBookId = prevBook.id

    return book
  })
}

function _createBook(title, amount) {
  return {
    id: makeId(),
    title,
    subtitle: makeLorem(4),
    authors: [makeLorem(1)],
    publishedDate: getRandomIntInclusive(1950, 2025),
    description: makeLorem(20),
    pageCount: getRandomIntInclusive(20, 900),
    categories: ["Fiction"],
    thumbnail: "http://ca.org/books-photos/20.jpg",
    language: "en",
    listPrice: {
      amount,
      currencyCode: "EUR",
      isOnSale: Math.random() > 0.7,
    },
    reviews: [],
  }
}
