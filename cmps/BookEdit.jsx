const { useState } = React


export function BookEdit({ onAddBook }) {
  const [bookToEdit, setBookToEdit] = useState({ title: "", price: "" })

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
    bookService.save(bookToSave)
      .then(() => {
      onAddBook(savedBook)
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
      <button>Sumbit</button>
    </form>
  )
}
