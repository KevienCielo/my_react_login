const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    expiresIn: "1000s",
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
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken: accessToken,
    });
  } else {
    res.status(400).json("Username or Password incorrect");
  }
});

//endpoint for displaying all the books in an array of JSON Objects
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

app.listen(5000);
console.log("server is running in port 5000");
