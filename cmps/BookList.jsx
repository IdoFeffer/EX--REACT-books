import { BookPreview } from "./BookPreview.jsx"

export function BookList({
  books,
  onRemoveBook,
  onSelectBookId,
  loadingClass,
}) {
  return (
    <section className={`book-list ${loadingClass}`}>
      <ul>
        {books.map((book) => {
          return (
            <li key={book.id}>
              <BookPreview book={book} />
              <button onClick={() => onRemoveBook(book.id)}>Remove</button>
              <button onClick={() => onSelectBookId(book.id)}>Details</button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
