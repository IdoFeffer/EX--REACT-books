import { bookService } from "../services/book.service.js"

const { useState } = React
const { useParams } = ReactRouterDOM

// const { bookId } = ReactRouterDOM.useParams()


export function AddReview() {
  const [review, setReview] = useState({
    fullname: "",
    rating: "1",
    readAt: "",
  })

  const {bookId} = useParams()

  function handleChange({ target }) {
    const { name, value } = target
    setReview((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(ev){
    ev.preventDefault()

    bookService.addReview(bookId, review)
        .then(() => {
            console.log('Review saved:', review)
            setReview({fullname: '', rating: '', readAt: ''})
        })
        .catch(err => {
            console.log('Error saving review:', err) 
        })
  }

  return (
    <section className="add-review">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullname"
          value={review.fullname}
          onChange={handleChange} 
          />
        <select name="rating" value={review.rating} onChange={handleChange}>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
        <input
          type="date"
          name="readAt"
          value={review.readAt}
          onChange={handleChange}
        />

        <button>Submit</button>
      </form>
    </section>
  )
}
