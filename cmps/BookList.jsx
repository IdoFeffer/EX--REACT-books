import { BookPreview } from "./BookPreview.jsx"
import { BookEdit } from "./BookEdit.jsx"
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
              <section className="books-btns">
                <button onClick={() => onRemoveBook(book.id)}>
                  <a class="fa-solid fa-trash"></a>
                </button>
                <button>
                  <Link to={`/book/${book.id}`}>
                    <a class="fa-solid fa-circle-info"></a>
                  </Link>
                </button>

                <button onClick={() => onEditBook(book.id)}>Edit</button>

              </section>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
