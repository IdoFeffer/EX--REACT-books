import { getRandomIntInclusive, loadFromStorage, makeId, makeLorem, saveToStorage } from "./util.service.js"
import { storageService } from "./async-storage.service.js"
import './book-preview.css'


const book_KEY = "bookDB"
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
}

function query(filterBy = {}) {
  return storageService.query(book_KEY).then((books) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, "i")
      books = books.filter((book) => regExp.test(book.title))
    }
    if (filterBy.minPrice) {
      books = books.filter((book) => book.listPrice.amount >= filterBy.minPrice)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(book_KEY, bookId)
}

function remove(bookId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(book_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(book_KEY, book)
  } else {
    return storageService.post(book_KEY, book)
  }
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

// function _createBook(title, amount = 250) {
//   const book = getEmptyBook(title, amount)
//   book.id = makeId()
//   return book
// }

function _createBook(title, amount) {
  return {
    id: makeId(),
    title,
    subtitle: makeLorem(4),
    authors: [makeLorem(1)],
    publishedDate: getRandomIntInclusive(1950, 2025),
    description: makeLorem(20),
    pageCount: getRandomIntInclusive(20,900),
    categories: ["Fiction"],
    thumbnail: "http://ca.org/books-photos/20.jpg",
    language: "en",
    listPrice: {
      amount,
      currencyCode: "EUR",
      isOnSale: Math.random() > 0.7
    },
  }
}
