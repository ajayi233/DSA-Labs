const loginUser = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = { email, password };

  if (!email || !password) {
    alert("all fields are required");
    return;
  }

  await fetch("/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === "success" && data.role === "user") {
        window.location.assign("/users/userHome");
      } else if (data.status === "success" && data.role === "admin") {
        window.location.assign("/users/adminHome");
      } else if (data.status == "failed") {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const submit = document.querySelector(".submit--btn");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  loginUser();
});
