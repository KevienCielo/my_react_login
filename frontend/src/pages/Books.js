import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import apiRequest from "../datafetch/apiRequest";

const Books = () => {
  const [books, setBooks] = useState("");
  const [bookName, setBookName] = useState("");
  const [searchMsg, setSearchMsg] = useState("");
  const [variant, setVariant] = useState("");

  const fetchBooks = async (objReq) => {
    const response = await apiRequest("http://localhost:5000/books", objReq);
    const booklist = await response.json();
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

  const handleSearch = async (event) => {
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
    const resultObj = await result.json();

    if (resultObj.Code === "200") {
      const resultArrObj = [
        {
          id: resultObj.id,
          BookName: resultObj.BookName,
          YearPublished: resultObj.YearPublished,
          Author: resultObj.Author,
          Category: resultObj.Category,
          status: resultObj.status,
        },
      ];
      setBooks(resultArrObj);
      setSearchMsg(resultObj.Msg);
      setVariant("success");
    } else {
      setSearchMsg(resultObj.Msg);
      setVariant("danger");
    }
  };

  return (
    <article className="Books col mt-5">
      <div className="w-25 mb-2 d-inline-block">
        <Form className="d-flex" onSubmit={handleSearch}>
          <Form.Control
            type="search"
            placeholder="Name of Book"
            className="me-2 rounded-pill"
            aria-label="Search"
            value={bookName}
            onChange={(event) => setBookName(event.target.value)}
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
      <Alert className="d-inline-block ms-4" key={variant} variant={variant}>
        {searchMsg}
      </Alert>
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
