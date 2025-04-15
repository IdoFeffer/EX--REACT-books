import { BookFilter } from "../cmps/BookFilter.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "./BookDetails.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookEdit } from "../cmps/BookEdit.jsx"
import { showSuccessMsg } from "../services/event-bus.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function BookIndex({ onAddBook, onClose }) {
  const [books, setBooks] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
  // const [selectedBookId, setSelectedBookId] = useState(null)
  // const [isEditing, setIsEditing] = useState(false)
  // const [bookToEdit, setBookToEdit] = useState(null)

  useEffect(() => {
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

      <section style={{ marginTop: "10px" }} className="container">
        <Link to="/book/edit">Add Car</Link>
      </section>
      <BookList
        loadingClass={loadingClass}
        books={books}
        onRemoveBook={onRemoveBook}
      />
      {/* <BookEdit onAddBook={onAddBook} onClose={() => setIsEditing(false)} /> */}
    </section>
  )
}

// return (
//   <section className="book-index">
//     {selectedBookId && (
//       <BookDetails
//         onBack={() => onSelectBookId(null)}
//         bookId={selectedBookId}
//       />
//     )}

//     {!selectedBookId &&
//       (books ? (
//         <React.Fragment>
//           <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />

//           <button onClick={() => setIsEditing(true)}>➕ Add Book</button>
//           {isEditing && (
//             <BookEdit
//               onAddBook={(savedBook) => {
//                 onAddBook(savedBook)
//                 setIsEditing(false)
//               }}
//               onClose={() => setIsEditing(false)}
//             />
//           )}

//           <BookList
//             loadingClass={loadingClass}
//             books={books}
//             onRemoveBook={onRemoveBook}
//             onSelectBookId={onSelectBookId}
//           />
//         </React.Fragment>
//       ) : (
//         <div>Loading...</div>
//       ))}
//   </section>
// )
