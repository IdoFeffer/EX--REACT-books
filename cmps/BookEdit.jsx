const { useState } = React
const { useNavigate } = ReactRouterDOM

import { bookService } from "../services/book.service.js"
import { showSuccessMsg } from "../services/event-bus.service.js"

export function BookEdit({ onAddBook }) {
  const [bookToEdit, setBookToEdit] = useState({ title: "", price: "" })
  const navigate = useNavigate()

  function handleChange({ target }) {
    const field = target.name
    let value = target.value
    if (target.type === "number") value = +value

    setBookToEdit((prev) => ({ ...prev, [field]: value }))
  }

  function onSubmitBook(ev) {
    ev.preventDefault()

    const bookToSave = {
      title: bookToEdit.title,
      listPrice: {
        amount: bookToEdit.price,
        currencyCode: "USD",
        isOnSale: false,
      },
    }

    bookService.save(bookToSave).then((savedBook) => {
      showSuccessMsg(`Book "${savedBook.title}" added ✅`)
      navigate("/book")
      setIsEditing(false)
    })
  }

  return (
    <form onSubmit={onSubmitBook}>
      <input
        type="text"
        name="title"
        value={bookToEdit.title}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        value={bookToEdit.price}
        onChange={handleChange}
      />
      <button>Add book</button>
    </form>
  )
}
