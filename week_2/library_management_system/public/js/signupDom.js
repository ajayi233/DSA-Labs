const signupUser = async () => {
  try {
    const name = document.querySelector("name").value;
    const email = document.querySelector("email").value;
    const phone = document.querySelector("phone").value;
    const role = document.querySelector("role").value;
    const password = document.querySelector("password").value;

    const user = { name, email, phone, role, password };

    if (!name || !email || !phone || !role || !password) {
      alert("All fields are required");
      return;
    }

    const response = await fetch("/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (data.status === "success") {
      window.location.assign("/users/login");
    } else if (data.status === "failed") {
      alert(data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const submit = document.querySelector(".submit--btn");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  signupUser();
});


