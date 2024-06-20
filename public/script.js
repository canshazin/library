const url = "http://localhost:3000";
console.log("hi");

const form1 = document.getElementById("form1");
const divBooks = document.querySelector("#books");
const divBooksReturned = document.querySelector("#booksReturned");

async function borrowed() {
  try {
    divBooks.innerHTML = "";
    const books = await axios.get(`${url}/borrowed`);
    console.log("this is books borrowed");
    const data = books.data.booksBorrowed;
    if (books.data.flag == 0) {
      console.log("no books borrowed");
    } else {
      data.forEach((book) => {
        const div = document.createElement("div");
        const bname = document.createElement("label");
        bname.textContent = `Book Name : ${book.bname}`;
        bname.dataset.value = book.bname;

        const takenDate = document.createElement("label");
        takenDate.textContent = `Book taken Date : ${book.takenDate.slice(
          0,
          -1
        )}`;
        takenDate.dataset.value = book.takenDate;

        const returnDate = document.createElement("label");
        returnDate.textContent = `Book return Date : ${book.returnDate.slice(
          0,
          -1
        )}`;
        returnDate.dataset.value = book.returnDate;

        const date1 = new Date(book.takenDate);
        const date2 = new Date();

        // Get the timestamp values (in milliseconds)
        const timestampDate1 = date1.getTime();
        const timestampDate2 = date2.getTime();

        // Convert milliseconds to hours
        const diffInHours = Math.floor(
          (timestampDate2 - timestampDate1) / (1000 * 60 * 60)
        );

        let fine = 0;
        if (diffInHours > 24) {
          fine = (diffInHours - 24) * 10;
        }

        const currentFine = document.createElement("label");
        currentFine.textContent = `current fine : ${fine}`;
        currentFine.dataset.value = fine;

        const returnBook = document.createElement("button");
        returnBook.classList.add("returnbutton");
        returnBook.textContent = "Return";

        div.appendChild(bname);
        div.appendChild(takenDate);
        div.appendChild(returnDate);
        div.appendChild(currentFine);
        div.appendChild(returnBook);
        divBooks.appendChild(div);
      });
      const returnButtons = document.querySelectorAll(".returnbutton");
      console.log(returnButtons);
      returnButtons.forEach((button) => {
        button.addEventListener("click", handleReturnClick);
      });

      // Event handler function
      async function handleReturnClick(event) {
        try {
          const button = event.currentTarget;
          const div = button.parentNode;

          // Access the book details from the div element
          // const bookName = div.querySelector("label[data-value]").dataset.value;
          //select all children

          const allChildren = div.querySelectorAll("*");
          const bookName = allChildren[0].dataset.value;
          console.log(bookName, "from all children");
          console.log(allChildren);

          const fine = parseInt(allChildren[3].dataset.value);
          console.log(fine, "fine from all children");

          if (fine > 0) {
            div.innerHTML = "";
            const input = document.createElement("input");
            input.placeholder = `${fine}`;
            div.appendChild(input);
            const payFine = document.createElement("button");
            payFine.id = "fineButton";
            payFine.textContent = "pay fine";
            div.appendChild(payFine);
            // const payFinelistener = div.querySelector("#fineButton");

            payFine.addEventListener("click", async (event) => {
              event.preventDefault();
              const updateData = await axios.get(
                `${url}/updateData/${bookName}`
              );
              console.log(updateData.data);
              // div.innerHTML = "";
              div.remove();
              returnedBooks();
            });
          } else {
            const updateData = await axios.get(`${url}/updateData/${bookName}`);
            console.log(updateData.data);
            // div.innerHTML = "";
            div.remove();
            returnedBooks();
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}
async function returnedBooks() {
  divBooksReturned.innerHTML = "";
  const books = await axios.get(`${url}/returned`);
  console.log(books.data);
  const data = books.data.booksreturned;
  if (books.data.flag == 0) {
    console.log("no books returned");
  } else {
    data.forEach((book) => {
      const div = document.createElement("div");
      const bname = document.createElement("label");
      bname.textContent = `Book Name : ${book.bname}`;
      bname.dataset.value = book.bname;

      const date1 = new Date(book.takenDate);
      const date2 = new Date(book.returnedDate);

      // Get the timestamp values (in milliseconds)
      const timestampDate1 = date1.getTime();
      const timestampDate2 = date2.getTime();

      // Convert milliseconds to hours
      const diffInHours = Math.floor(
        (timestampDate2 - timestampDate1) / (1000 * 60 * 60)
      );

      let fine = 0;
      if (diffInHours > 24) {
        fine = (diffInHours - 24) * 10;
      }

      const currentFine = document.createElement("label");
      currentFine.textContent = `current fine : ${fine}`;
      currentFine.dataset.value = fine;

      const returnedDate = document.createElement("label");
      returnedDate.textContent = `Book returned Date : ${book.returnedDate.slice(
        0,
        -1
      )}`;
      returnedDate.dataset.value = book.returnedDate;

      div.appendChild(bname);

      div.appendChild(currentFine);
      div.appendChild(returnedDate);
      divBooksReturned.appendChild(div);
    });
  }
}

window.addEventListener("DOMContentLoaded", function () {
  borrowed();
  returnedBooks();
});

form1.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();

    const bookname = document.querySelector("#bookname");
    const bname = bookname.value.toLowerCase();
    let takenDate = new Date();
    takenDate = new Date(takenDate.getTime() + 5.5 * 60 * 60 * 1000);

    // Add 24 hours (1 day) to today's date
    const returnDate = new Date(takenDate.getTime() + 24 * 60 * 60 * 1000);

    const book = {
      bname: bname,
      takenDate: takenDate,
      returnDate: returnDate,
      returnedDate: null,
    };
    const data = await axios.post(`${url}/saveData`, book);
    console.log(data);

    bookname.value = "";
    borrowed();
    returnedBooks();
  } catch (err) {
    console.log(err);
  }
});

// form2.addEventListener("submit", async (event) => {
//   try {
//     event.preventDefault();
//     const ul = document.querySelector("ul");
//     const cn = document.querySelector("#cname2");
//     console.log(cn.value);
//     const reviews = await axios.get(`${url}/getData/${cn.value}`);
//     const data = reviews.data;
//     const allReviews = data.content;
//     let total = 0;
//     let count = 0;
//     if (data.flag == 0) {
//       ul.textContent = "No such company...";
//     } else {
//       allReviews.map((row) => {
//         total += row.rating;
//         count += 1;
//       });
//       const avg = total / count;
//       ul.innerHTML = `Company : ${cn.value}--------------------Average : ${avg}`;
//       allReviews.map((row) => {
//         const li1 = document.createElement("li");
//         li1.textContent = `Pros : ${row.pros}`;
//         ul.appendChild(li1);

//         const li2 = document.createElement("li");
//         li2.textContent = `Cons : ${row.cons}`;
//         ul.appendChild(li2);

//         const li3 = document.createElement("li");
//         li3.textContent = `Rating : ${row.rating}`;
//         ul.appendChild(li3);
//         const hr = document.createElement("hr");
//         ul.appendChild(hr);
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });
