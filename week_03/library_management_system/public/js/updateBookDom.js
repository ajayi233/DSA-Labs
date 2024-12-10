const updateBook = async () => {
  const title = document.querySelector("#title").value;
  const genreID = document.querySelector("#genre").value;
  const author = document.querySelector("#author").value;
  const publisher = document.querySelector("#publisher").value;
  const yearPublished = document.querySelector("#publicationDate").value;
  const copies = document.querySelector("#availableCopies").value;
  const description = document.querySelector("#description").value;

  const splittedURL = window.location.pathname.split("/");
  const bookId = splittedURL[splittedURL.length - 1];
  const book = {
    title,
    genreID,
    author,
    publisher,
    yearPublished,
    copies,
    description,
  };

  if (
    !title ||
    !genreID ||
    !author ||
    !publisher ||
    !yearPublished ||
    !description ||
    !copies
  ) {
    alert("All fields are required");
    return;
  }

  await fetch(`/books/update/${bookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === "success") {
        alert("Book modified successfully");
      } else if (data.status === "failed") {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

document.querySelector(".editBook--btn").addEventListener("click", (e) => {
  e.preventDefault();
  updateBook();
});
