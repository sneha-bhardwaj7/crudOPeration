"use client"

import { useState, useEffect } from "react"
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap"
import BookDataService from "../services/book.services"

const AddBook = ({ id, setBookId }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [status, setStatus] = useState("Available")
  const [flag, setFlag] = useState(true) // Flag to handle toggle
  const [message, setMessage] = useState({ error: false, msg: "" })

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    if (!title || !author) {
      setMessage({ error: true, msg: "All fields are mandatory!" })
      return
    }

    const newBook = { title, author, status }

    try {
      if (id) {
        await BookDataService.updateBook(id, newBook)
        setBookId("")
        setMessage({ error: false, msg: "Book updated successfully!" })
      } else {
        await BookDataService.addBooks(newBook)
        setMessage({ error: false, msg: "New book added successfully!" })
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message })
    }

    setTitle("")
    setAuthor("")
  }

  // Load book for editing
  const editHandler = async () => {
    setMessage("")
    try {
      const docSnap = await BookDataService.getBook(id)
      if (docSnap.exists()) {
        const data = docSnap.data()
        setTitle(data.title)
        setAuthor(data.author)
        setStatus(data.status)
        setFlag(data.status === "Available")
      } else {
        setMessage({ error: true, msg: "Book not found!" })
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message })
    }
  }

  useEffect(() => {
    if (id) {
      editHandler()
    }
  }, [id])

  return (
    <div className="p-4 box bg-light rounded shadow-sm">
      {/* Alert Message */}
      {message?.msg && (
        <Alert variant={message.error ? "danger" : "success"} dismissible onClose={() => setMessage("")}>
          {message.msg}
        </Alert>
      )}

      {/* Book Form */}
      <Form onSubmit={handleSubmit}>
        {/* Book Title */}
        <Form.Group className="mb-3" controlId="formBookTitle">
          <InputGroup>
            <InputGroup.Text>B</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Book Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        {/* Book Author */}
        <Form.Group className="mb-3" controlId="formBookAuthor">
          <InputGroup>
            <InputGroup.Text>A</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Book Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        {/* Book Status */}
        <ButtonGroup className="mb-3 w-100">
          <Button
            variant="success"
            disabled={flag}
            onClick={() => {
              setStatus("Available")
              setFlag(true)
            }}
          >
            Available
          </Button>
          <Button
            variant="danger"
            disabled={!flag}
            onClick={() => {
              setStatus("Not Available")
              setFlag(false)
            }}
          >
            Not Available
          </Button>
        </ButtonGroup>

        {/* Submit Button */}
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            {id ? "Update Book" : "Add Book"}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default AddBook
