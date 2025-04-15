const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM

import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"
import { BookAdd } from "./pages/BookAdd.jsx"

import { AppHeader } from "./cmps/AppHeader.jsx"
import { BookEdit } from "./cmps/BookEdit.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { Team } from "./cmps/Team.jsx"
import { Vision } from "./cmps/Vision.jsx"

export function RootCmp() {
  // const [page, setPage] = useState('book')

  return (
    <Router>
      <section className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/about/vision" element={<Vision />} /> 
            <Route path="/book" element={<BookIndex />} /> 
            <Route path="/book/:bookId" element={<BookDetails />} />
            <Route path="/book/edit" element={<BookEdit />} />
            <Route path="/book/edit/:bookId" element={<BookEdit />} />
            <Route path="/book/add" element={<BookAdd />} />
          </Routes>
        </main>
        <UserMsg />
      </section>
    </Router>
  )
}
