const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const Books = [
  {
    id: 1,
    BookName: "PHP 8",
    YearPublished: "2023",
    Author: "VicS",
    Category: "Web",
    status: 1,
  },
  {
    id: 2,
    BookName: "React.js",
    YearPublished: "2000",
    Author: "Peter SMith",
    Category: "Web",
    status: 1,
  },
  {
    id: 3,
    BookName: "CSS framework",
    YearPublished: "2005",
    Author: "Jaguar",
    Category: "Web",
    status: 1,
  },
  {
    id: 4,
    BookName: "Data Science",
    YearPublished: "2023",
    Author: "Vic S",
    Category: "Data",
    status: 1,
  },
];

const LoginProfiles = [
  {
    id: 1,
    username: "admin",
    password: "passwd123",
    isAdmin: true,
  },
  {
    id: 2,
    username: "staff",
    password: "123456",
    isAdmin: false,
  },
  {
    id: 3,
    username: "vice",
    password: "abrakadabra",
    isAdmin: false,
  },
  {
    id: 4,
    username: "super",
    password: "69843",
    isAdmin: true,
  },
  {
    id: 5,
    username: "user",
    password: "123",
    isAdmin: false,
  },
];

//function generating an access token
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "ThisMYsecretKey", {
    expiresIn: "1d",
  });
};

//middleware security using JWT
const verify = (req, res, next) => {
  const autHeader = req.headers.authorization;

  if (autHeader) {
    const token = autHeader.split(" ")[1];

    jwt.verify(token, "ThisMYsecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(403).json("You are not authenticated");
  }
};

//endoint for login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = LoginProfiles.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    const accessToken = generateAccessToken(user);
    res.json({
      Code: "200",
      Msg: "Login Successful",
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken: accessToken,
    });
  } else {
    res.json({ Code: "400", Msg: "Username or Password incorrect" });
  }
});

//endpoint for displaying all the books
app.get("/books", verify, (req, res) => {
  res.json(Books);
});

//endpoint for receiving an Id of a book and returning its details
app.get("/books/:bookId", verify, (req, res) => {
  const book = Books.find((u) => {
    return parseInt(u.id) === parseInt(req.params.bookId);
  });

  if (book) {
    res.json(book);
  }
});

//endpoint for receiving a name of a book and returning its details
app.post("/books/search", verify, (req, res) => {
  const book = Books.find((book) => {
    return book.BookName.toLowerCase() === req.body.BookName.toLowerCase();
  });

  if (book) {
    res.json({
      Code: "200",
      Msg: "Book Found",
      id: book.id,
      BookName: book.BookName,
      YearPublished: book.YearPublished,
      Author: book.Author,
      Category: book.Category,
      status: book.status,
    });
  } else {
    res.json({
      Code: "400",
      Msg: `Book not found. No copy of book: "${req.body.BookName.toLowerCase()}"`,
    });
  }
});

//endpoint for displaying all the users
app.get("/users", verify, (req, res) => {
  res.json(LoginProfiles);
});

app.post("/users/search", verify, (req, res) => {
  const user = LoginProfiles.find((user) => {
    return user.username.toLowerCase() === req.body.username.toLowerCase();
  });

  if (user) {
    res.json({
      Code: "200",
      Msg: "User Found",
      id: user.id,
      username: user.username,
      password: user.password,
      isAdmin: user.isAdmin,
    });
  } else {
    res.json({
      Code: "400",
      Msg: `User not found. No record of user: "${req.body.BookName.toLowerCase()}"`,
    });
  }
});

app.post("/users/add", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const isAdmin = req.body.isAdmin === "true" ? true : false;
  const newRecord = {
    id: LoginProfiles.length + 1,
    username: username,
    password: password,
    isAdmin: isAdmin,
  };

  if (LoginProfiles.push(newRecord)) {
    res.json({
      Code: "200",
      Msg: `User "${username}" was created and added to the list`,
      id: newRecord.id,
      username: newRecord.username,
      password: newRecord.password,
      isAdmin: newRecord.isAdmin,
    });
  } else {
    res.json({ Code: "400", Msg: "Adding Failed" });
  }
});

app.listen(5000);
console.log("server is running in port 5000");
