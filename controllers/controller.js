const Book = require("../models/book.js");
const { param } = require("../routes/routes.js");

// exports.getData = (req, res, next) => {
//   // const attendenceDate = req.params.attendenceDate;
//   // // res.send(attendenceDate);
//   // const outcome = await Student.findAll({
//   //   attributes: ["sname"],
//   //   include: {
//   //     model: Attendence,
//   //     where: {
//   //       date: attendenceDate,
//   //     },
//   //     attributes: ["status"],
//   //   },
//   // });

//   // res.json(outcome);
//   // const retrievedStudents = [];
//   // const attendenceDate = req.params.attendenceDate;
//   // const students = await Student.findAll();
//   // for (student of students) {
//   //   const reqData = await student.getAttendence({
//   //     where: { date: attendenceDate },
//   //   });
//   //   retrievedStudents.push({ student, reqData });
//   //   console.log(retrievedStudents);
//   const attendenceDate = req.params.attendenceDate;
//   console.log(typeof attendenceDate);

//   // // res.send(attendenceDate);
//   Attendence.findAll({ where: { date: attendenceDate } })
//     .then((outcome) => {
//       if (outcome.length > 0) {
//         const data = [];
//         const promises = outcome.map((item) => {
//           return Student.findByPk(item.studentId)
//             .then((student) => {
//               data.push({ name: student.sname, status: item.status });
//             })
//             .catch((err) => {
//               res.send(err);
//             });
//         });

//         Promise.all(promises)
//           .then(() => {
//             res.json(data);
//           })
//           .catch((err) => {
//             res.send("error while retrieving data: " + err);
//           });
//       } else {
//         res.send("no");
//       }
//     })
//     .catch((err) => {
//       res.send("error while retrieving data: " + err);
//     });
// };

// exports.fetch = async (req, res, next) => {
//   try {
//     const students = await Student.findAll();
//     const promises = students.map(async (student) => {
//       try {
//         const final = await Attendence.findAll({
//           where: { studentId: student.id },
//         });
//         const total = final.length;
//         const statusArray = await final.filter(
//           (record) => record.status == "1"
//         );
//         return {
//           name: student.sname,
//           statusCount: statusArray.length,
//           total: total,
//         };
//       } catch (err) {
//         console.log("err", err);
//         return null; // Or handle the error as desired
//       }
//     });

//     const data = await Promise.all(promises);
//     res.json(data); // Filter out null values
//   } catch (err) {
//     console.log("err", err);
//     // Pass the error to the next middleware
//   }
// };

// exports.getStudents = (req, res, next) => {
//   Student.findAll()
//     .then((students) => {
//       console.log(students);
//       res.json(students);
//     })
//     .catch((err) => {
//       res.send("error whole getStudents");
//     });
// };

// exports.addData = (req, res, next) => {
//   console.log("incoming data to be added");
//   console.log(req.body);
//   const attendanceDate = req.body.attendanceDate;
//   console.log(attendanceDate);
//   const studentAttendance = req.body.studentAttendance;

//   studentAttendance.map((item) => {
//     Student.findByPk(item.sid)
//       .then((student) => {
//         return Attendence.create({
//           date: attendanceDate
//           status: item.status,
//           studentId: item.sid,
//         });
//       })
//       .then((result) => {
//         console.log("successfully added");
//         res.send("added");
//       })
//       .catch((err) => {
//         console.log("couldnt create ", err);
//       });
//   });

//   // req.student
//   // .createProduct({
//   // title: title,
//   // price: price,
//   // imageUrl: imageUrl,
//   // description: description,
//   // })
// };

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
  res.send("page not found ma boiii");
};
