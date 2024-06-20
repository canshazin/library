const Book = require("../models/book.js");

exports.saveData = async (req, res, next) => {
  try {
    const incomingData = req.body;
    console.log(incomingData);
    const bookname = incomingData.bname;

    const book = await Book.findAll({ where: { bname: bookname } });
    if (book.length > 0) {
      res.send("book borrowed already");
    } else {
      const newBook = await Book.create({
        bname: bookname,
        takenDate: incomingData.takenDate,
        returnDate: incomingData.returnDate,
        returnedDate: incomingData.returnedDate,
      });

      res.send("book added");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.borrowed = async (req, res, next) => {
  try {
    const returnData = {
      flag: 0,
      booksBorrowed: null,
    };

    const result = await Book.findAll({ where: { returnedDate: null } });
    if (result.length > 0) {
      returnData.flag = 1;
      returnData.booksBorrowed = result;
    }
    res.json(returnData);
  } catch (err) {
    console.log(err);
  }
};

exports.updateData = async (req, res, next) => {
  try {
    const bookName = req.params.bookName;
    const result = await Book.findOne({ where: { bname: bookName } });
    if (result) {
      let today = new Date();
      today = new Date(today.getTime() + 5.5 * 60 * 60 * 1000);
      await result.update({ returnedDate: today });
      res.send("Book return date added");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.returned = async (req, res, next) => {
  try {
    const returnData = {
      flag: 0,
      booksreturned: null,
    };

    const allbooks = await Book.findAll({});
    const result = allbooks.filter((book) => book.returnedDate !== null);
    console.log(result, "books");
    if (result.length > 0) {
      returnData.flag = 1;
      returnData.booksreturned = result;
    }
    res.json(returnData);
  } catch (err) {
    console.log(err);
  }
};
exports.HomePage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
};
exports.pageNotFound = (req, res, next) => {
  res.send("page not found!!!");
};
