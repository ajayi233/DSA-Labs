const borrowBooks = async function(e){
  e.preventDefault();
  console.log(e, id);
  const userId = document.getElementById("userId").value;
  await fetch(`/transactions/createTransaction/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};
