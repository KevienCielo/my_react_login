import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import apiRequest from "../datafetch/apiRequest";

const Books = () => {
  const [books, setBooks] = useState("");
  const fetchBooks = async (objReq) => {
    console.log(objReq);
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

  return (
    <article className="Books col mt-5">
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
