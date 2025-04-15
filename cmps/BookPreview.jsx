import { getBooks } from "../services/util.service.js"

export function BookPreview({ book }) {
    const { title, listPrice, thumbnail } = book
    const priceClass = listPrice.amount > 150 
        ? 'price-high' : listPrice.amount < 20
        ? 'price-low' : ''
    const booksImg = getBooks(title)

    return (
        <article className="book-preview">
            <h2>{title}</h2>
            <h4 className={priceClass}>Price: {listPrice.amount} {listPrice.currencyCode}</h4>
            <img src={booksImg || thumbnail || 'https://via.placeholder.com/150'} alt={title} />
            </article>
    )
}
