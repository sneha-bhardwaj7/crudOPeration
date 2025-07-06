"use client"

import { useState } from "react"
import { Container, Navbar, Row, Col } from "react-bootstrap"
import AddBook from "./components/AddBook"
import BooksList from "./components/BooksList"
import "./App.css"

const App = () => {
  const [bookId, setBookId] = useState("")

  const getBookIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id)
    setBookId(id)
  }

  return (
    <>
      {/* Header Navbar */}
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">📚 Library - Firebase CRUD</Navbar.Brand>
        </Container>
      </Navbar>

      {/* Add Book Section */}
      <Container className="my-4 d-flex justify-content-center">
        <Row>
          <Col>
            <AddBook id={bookId} setBookId={setBookId} />
          </Col>
        </Row>
      </Container>

      {/* Books List Section */}
      <Container className="my-4">
        <Row>
          <Col>
            <BooksList getBookId={getBookIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
