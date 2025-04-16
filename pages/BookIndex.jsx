import { BookDetails } from "./BookDetails.jsx"

import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookEdit } from "../cmps/BookEdit.jsx"

import { bookService } from "../services/book.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParam(searchParams))
  const [isLoading, setIsLoading] = useState(false)

  // const [selectedBookId, setSelectedBookId] = useState(null)
  // const [isEditing, setIsEditing] = useState(false)
  // const [bookToEdit, setBookToEdit] = useState(null)

  useEffect(() => {
    const newFilter = bookService.getFilterFromSearchParam(searchParams)
    setFilterBy(newFilter)
  }, [searchParams])

  useEffect(() => {
    setSearchParams(filterBy)
    loadBooks()
  }, [filterBy])


  function loadBooks() {
    bookService
      .query(filterBy)
      .then((books) => setBooks(books))
      .catch((err) => console.log("err:", err))
  }

  function onRemoveBook(bookId) {
    setIsLoading(true)
    bookService
      .remove(bookId)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId))
        showSuccessMsg(`Book (${bookId}) removed successfully!`)
      })
      .catch((err) => {
        console.log("Problem removing book:", err)
        showErrorMsg("Problem removing book!")
      })
      .finally(() => setIsLoading(false))
  }

  function onSelectBookId(bookId) {
    setSelectedBookId(bookId)
  }

  function onSetFilterBy(filterByToEdit) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterByToEdit }))
  }

  function onAddBook(savedBook) {
    setBooks((prevBooks) => [...prevBooks, savedBook])
    showSuccessMsg(`Book "${savedBook.title}" added successfully!`)
  }


  const loadingClass = isLoading ? "loading" : ""

  return (
    <section className="book-index">
      <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />

      <section style={{ marginTop: "10px" }} className="add-btn-container">
        <Link to="/book/edit"className="add-btn"><a class="fa-solid fa-plus"></a>Add Book</Link>
        <Link to="/book/add" className="add-btn">📚 Add from Google</Link>
      </section>
      <BookList
        loadingClass={loadingClass}
        books={books}
        onRemoveBook={onRemoveBook}
      />
    </section>
  )
}