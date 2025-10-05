

const createUser = async () => {
    const fullNameEl = document.getElementById("fullName")
    const emailEl = document.getElementById("email")
    const passwordEl = document.getElementById("password")

    const fullName = fullNameEl.value.trim();
    const email = emailEl.value.trim();
    const password = passwordEl.value.trim();

    if (!fullName, !email, !password) {
        Swal.fire({
            title: "Warning!",
            text: "Please fill in all input fields!",
            icon: "warning",
            timer: 2000,
            showConfirmButton: false
        })
        return
    }


    try {

        const response = await fetch("http://localhost:5000/createuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName,
                email,
                password,
            })
        })

        const data = await response.json()
        console.log(data);

        // SweetAlert2
        if (data.message === "User Created Successfully") {
            Swal.fire({
                title: "Success!",
                text: "User has been created successfully 🎉",
                icon: "success",
                confirmButtonText: "OK"
            })
        }
        else if (data.message === "User Already Exists") {
            Swal.fire({
                title: "Oops!",
                text: "User already exists 😅",
                icon: "warning",
                confirmButtonText: "Try Again"
            })
        }


    } catch (error) {
        console.log("error", error.message);

        // SweetAlert2
        Swal.fire({
            title: "Error!",
            text: error.message,
            icon: "error",
            confirmButtonText: "OK"
        })
    }

    fullNameEl.value = ""
    emailEl.value = ""
    passwordEl.value = ""

    getUser()
}


const getUser = async () => {


    const getAllUser = document.getElementById("get-users")


    try {

        const response = await fetch("http://localhost:5000/getAllUsers")

        if (!response.ok) {
            if (response.status === 500) {
                getAllUser.innerHTML = `No User Exist. Please Create a User!`
                return;
            }

            throw new Error(`HTTP Error: ${response.status}`);
        }


        const data = await response.json()
        const users = data.data
        console.log(users);

        let row = "";

        users.forEach(user => {

            row += `
        <tr>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td class="center" onclick="update()">✏️</td>
            <td class="center" onclick="delete()">🗑️</td>
        </tr>
        `
        });

        getAllUser.innerHTML = `
           <h2>Get All Users</h2>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    ${row}
                </tbody>
            </table>`



    } catch (error) {
        console.log(error.message);

        // SweetAlert2 Error Alert
        Swal.fire({
            title: "Error!",
            text: error.message || "Something went wrong!",
            icon: "error",
            confirmButtonText: "OK"
        });
    }

}

getUser()

window.createUser = createUser
window.getUser = getUser