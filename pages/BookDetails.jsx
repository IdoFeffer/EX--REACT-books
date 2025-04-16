import { bookService } from "../services/book.service.js"
import { getBooks } from "../services/util.service.js"
import { AddReview } from "../cmps/AddReview.jsx"

const { useParams, useNavigate, Link } = ReactRouterDOM

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {
  const [book, setBook] = useState(null)
  const [isAddingReview, setIsAddingReview] = useState(false)
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    loadBook()
  }, [params.bookId])

  function onBack() {
    navigate('/book')
  }

  function loadBook() {
    bookService
      .get(params.bookId)
      .then((book) => setBook(book))
      .catch((err) => console.log("err:", err))
  }

  if (!book) return <div>Loading...</div>
  const { title, listPrice, pageCount, publishedDate } = book
  const booksImg = getBooks(title)

  const isOnSale = listPrice.isOnSale

  const currYear = new Date().getFullYear()
  const diff = currYear - publishedDate
  let publishedLabel = ""
  if (diff > 10) publishedLabel = "Vintage"
  else if (diff === 0) publishedLabel = "New"

  let readingLevel
  if (pageCount > 500) readingLevel = "Serious Reading"
  else if (pageCount >= 200) readingLevel = "Descent reading"
  else if (pageCount <= 100) readingLevel = "Light reading"

  return (
    <section className="book-details container">
      {publishedLabel && <h4>{publishedLabel}</h4>}
      {readingLevel && <h4>{readingLevel}</h4>}
      <h4>Page Count: {pageCount}</h4>
      <h1>Book Title: {title}</h1>
      <h1>Book Price: {listPrice.amount}</h1>
      {isOnSale && <h4 className="on-sale">🔥 On Sale!</h4>}
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae
        fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti
        veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita,
        architecto omnis?
      </p>
      {book.thumbnail && (
        <img src={book.thumbnail} alt="Book Image" className="book-img" />
      )}

      {book.reviews && book.reviews.length > 0 && (
        <section>
          <h3>Reviews:</h3>
          <ul>
            {book.reviews.map((review, idx) => {
              return (
                <li key={idx} className="book-review">
                  <p>{review.fullname}</p>
                  <p>Rating: {review.rating}</p>
                  <p>Read at: {review.readAt}</p>
                </li>
              )
            })}
          </ul>
        </section>
      )}
      <Link to={`/book/${book.prevBookId}`}>⬅️ Prev</Link>
      <Link to={`/book/${book.nextBookId}`}>Next ➡️</Link>

      <button onClick={() => setIsAddingReview((prev) => !prev)}>
        {isAddingReview ? "Cancel" : "➕ Add Review"}
      </button>

      {isAddingReview && <AddReview bookId={book.id} />}
      <button onClick={onBack}>Back</button>
    </section>
  )
}
