import { BookPreview } from "./BookPreview.jsx"
const { Link } = ReactRouterDOM

export function BookList({
  books,
  onRemoveBook,
  onSelectBookId,
  loadingClass,
}) {
  if (!books || !books.length) return <p>No books to show</p>
  return (
    <section className={`book-list ${loadingClass}`}>
      <ul>
        {books.map((book) => {
          return (
            <li key={book.id}>
              <BookPreview book={book} />
              <button onClick={() => onRemoveBook(book.id)}>Remove</button>
              <button>
                <Link to={`/book/${book.id}`}>Details</Link>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
