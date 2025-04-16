import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { googleBookService } from "../services/google-book.service.js"
import { getRandomIntInclusive } from "../services/util.service.js"

const { useState, useEffect } = React

export function BookAdd() {
  const [add, IsAdding] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm)
  const [results, setResults] = useState([])

  function handleChange({ target }) {
    setSearchTerm(target.value)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 800)
    return () => clearTimeout(timer)
  }, [searchTerm])

  useEffect(() => {
    if (!debouncedTerm) return
    googleBookService.query(debouncedTerm).then((results) => {
      console.log("Results from API:", results)
      setResults(results)
    })
  }, [debouncedTerm])

  function onSubmit(ev) {
    ev.preventDefault()
    setDebouncedTerm(searchTerm)
  }

  function onAddGoogleBook(googleBook) {
    console.log("googleBook:", googleBook)
    const newBook = {
      id: googleBook.id,
      title: googleBook.volumeInfo.title,
      thumbnail:
        (googleBook.volumeInfo.imageLinks &&
          googleBook.volumeInfo.imageLinks.thumbnail) ||
        "",
      listPrice: {
        amount: getRandomIntInclusive(20, 300),
        currencyCode: "EUR",
        isOnSale: false,
      },
    }

    bookService
      .addBook(newBook)
      .then(() => showSuccessMsg("Book added!"))
      .catch((err) => {
        console.log("error:", err)
        if (err === "Book already exists") {
          showErrorMsg("This book already exists in your list!")
        } else {
          showErrorMsg("Could not add book")
        }
      })
  }

  return (
    <section>
      <ul>
        <ul>
          {results.map((book) => (
            <li key={book.id}>
              <h4>{book.volumeInfo.title}</h4>            
              <button onClick={() => onAddGoogleBook(book)}>➕</button>
            </li>
          ))}
        </ul>
      </ul>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Seatch for books.."
        />
      </form>
    </section>
  )
}