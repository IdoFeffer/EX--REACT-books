export function BookPreview({ book }) {
    const { title, listPrice, thumbnail } = book

    const priceClass = listPrice.amount > 150 
        ? 'price-high' : listPrice.amount < 20
        ? 'price-low' : ''

    return (
        <article className="book-preview">
            <h2>{title}</h2>
            <h4 className={priceClass}>Price: {listPrice.amount} {listPrice.currencyCode}</h4>
            <img src={thumbnail || 'https://via.placeholder.com/150'} alt="Book Image" />
        </article>
    )
}
