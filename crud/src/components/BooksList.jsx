"use client"

import { useEffect, useState } from "react"
import { Table, Button } from "react-bootstrap"
import BookDataService from "../services/book.services"

const BooksList = ({ getBookId }) => {
  const [books, setBooks] = useState([])

  // Fetch all books on component mount
  useEffect(() => {
    getBooks()
  }, [])

  // Fetch books from Firebase
  const getBooks = async () => {
    try {
      const data = await BookDataService.getAllBooks()
      const bookList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setBooks(bookList)
    } catch (err) {
      console.error("Error fetching books:", err)
    }
  }

  // Delete a book
  const deleteHandler = async (id) => {
    try {
      await BookDataService.deleteBook(id)
      getBooks() // Refresh list after deletion
    } catch (err) {
      console.error("Error deleting book:", err)
    }
  }

  return (
    <div className="book-list mt-4">
      {/* Refresh Button */}
      <div className="mb-3 text-end">
        <Button variant="dark" onClick={getBooks}>
          Refresh List
        </Button>
      </div>

      {/* Book Table */}
      <Table striped bordered hover responsive size="sm">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Book Title</th>
            <th>Book Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((doc, index) => (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.author}</td>
                <td>
                  <span className={`badge ${doc.status === "Available" ? "bg-success" : "bg-danger"}`}>
                    {doc.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="secondary" size="sm" onClick={() => getBookId(doc.id)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => deleteHandler(doc.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BooksList
