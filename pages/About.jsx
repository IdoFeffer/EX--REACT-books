const { Outlet, NavLink } = ReactRouterDOM

export function About() {
  return (
    <section className="about container">
      <h1>📚 Book Manager App</h1>
      <p>
        <strong>Book Manager</strong> is a React-based application that helps
        users manage a collection of books. It supports both manual book
        management and integration with the <strong>Google Books API</strong>{" "}
        for enhanced functionality.
      </p>

      <h2>🔑 Key Features</h2>
      <ul>
        <li>
          <strong>View Local Book List</strong> – Display and manage books
          stored in localStorage.
        </li>
        <li>
          <strong>Search Books via Google Books API</strong> – Get real-time
          results from Google's book database.
        </li>
        <li>
          <strong>Add Books to Your Collection</strong> – Add books from Google
          Books with a single click.
        </li>
        <li>
          <strong>Duplicate Prevention</strong> – Prevents adding books that
          already exist in your list.
        </li>
        <li>
          <strong>Book Details & Navigation</strong> – View full book info and
          navigate between books.
        </li>
        <li>
          <strong>Add Reviews</strong> – Leave ratings, read dates, and reviewer
          names per book.
        </li>
      </ul>

      <h2>🛠 Technologies Used</h2>
      <ul>
        <li>React.js</li>
        <li>LocalStorage</li>
        <li>Google Books API</li>
        <li>Basic CSS</li>
      </ul>
      <nav style={{ display: "flex", gap: "20px" }}>
        <NavLink to="/about/team">Team</NavLink>
        <NavLink to="/about/vision">Vision</NavLink>
      </nav>
      <section>
        <Outlet />
      </section>
    </section>
  )
}
