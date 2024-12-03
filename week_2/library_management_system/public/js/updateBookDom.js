const updateBook = async (bookId) => {
  const title = document.querySelector("#title").value;
  const genreID = document.querySelector("#genre").value;
  const author = document.querySelector("#author").value;
  const publisher = document.querySelector("#publisher").value;
  const yearPublished = document.querySelector("#yearPublished").value;
  const available = document.querySelector("#available").value;
  const copies = document.querySelector("#copies").value;

  const book = {
    title,
    genreID,
    author,
    publisher,
    yearPublished,
    available,
    copies,
  };

  if (
    !title ||
    !genreID ||
    !author ||
    !publisher ||
    !yearPublished ||
    !available ||
    !copies
  ) {
    alert("All fields are required");
    return;
  }

  await fetch(`/books/updateBook/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === "success") {
        window.location.assign("/books");
      } else if (data.status === "failed") {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    });
};

document.querySelector(".updateBook--btn").addEventListener("click", (e) => {
  e.preventDefault();
  updateBook();
});
