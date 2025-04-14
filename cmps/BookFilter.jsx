const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, minPrice } = filterByToEdit
    // console.log('minSpeed:', minSpeed)
    return (
        <section className="book-filter container">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Title</label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />

                <label htmlFor="minSpeed">Min Price</label>
                <input onChange={handleChange} value={minPrice || ''} name="minPrice" id="minPrice" type="number" />

                <button>Submit</button>
            </form>
        </section>
    )
}

    // function handleChangeShortVersion({ target }) {
    //     const field = target.name
    //     let value = target.type === 'number' ? +target.value : target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    // }

    /* 
    function handleTxtChange({ target }) {
        const value = target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
    }

    function handleMinSpeedChange({ target }) {
        const value = +target.value
        setFilterByToEdit(prevFilter => ({ ...prevFilter, minSpeed: value }))
    }
    */
