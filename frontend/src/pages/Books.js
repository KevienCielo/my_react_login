import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import apiRequest from "../datafetch/apiRequest";

const Books = () => {
  const [books, setBooks] = useState("");
  const [bookName, setBookName] = useState("");

  const fetchBooks = async (objReq) => {
    const response = await apiRequest("http://localhost:5000/books", objReq);
    const booklist = await response.json();
    console.log(booklist);
    setBooks(booklist);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const objReq = {
      method: "GET",
      headers: {
        authorization: `token ${token}`,
      },
    };
    fetchBooks(objReq);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("accessToken");
    const objReq = {
      method: "POST",
      headers: {
        authorization: `token ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `BookName=${bookName}`,
    };
    const result = await apiRequest(
      "http://localhost:5000/books/search",
      objReq
    );
    const resultArr = [];
    const resultObj = await result.json();
    resultArr.push(resultObj);
    setBooks(resultArr);
  };

  return (
    <article className="Books col mt-5">
      <div className="w-25 mb-2">
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            placeholder="Name of Book"
            className="me-2 rounded-pill"
            aria-label="Search"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <Button
            className="rounded-pill"
            variant="outline-primary"
            type="submit"
          >
            Search
          </Button>
        </Form>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Book Id</th>
            <th>Book Name</th>
            <th>Publication Year</th>
            <th>Author</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {books.length ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.BookName}</td>
                <td>{book.YearPublished}</td>
                <td>{book.Author}</td>
                <td>{book.Category}</td>
                <td>{book.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                list empty
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </article>
  );
};

export default Books;
