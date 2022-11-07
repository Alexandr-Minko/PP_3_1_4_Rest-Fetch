async function getCurrentUserAndFillNavbarAndTable() {
    try {
        let httpResponse = await fetch("http://localhost:8080/api/currentUser");
        currentUser = await httpResponse.json();
        document.querySelector("#navbar-currentUser-Email").textContent = currentUser.username;
        document.querySelector("#navbar-currentUser-Roles").textContent = " with roles: " + currentUser.rolesToString
        document.querySelector("#userTable tbody").innerHTML = `
                <tr>
                    <td>${currentUser.id}</td>
                    <td>${currentUser.firstName}</td>
                    <td>${currentUser.lastName}</td>
                    <td>${currentUser.age}</td>
                    <td>${currentUser.email}</td>
                    <td>${currentUser.rolesToString}</td>
                </tr>
               `;
        if (currentUser.rolesToString.indexOf("ADMIN") !== -1) {
            getAllUsersAndFillTable()
            cleanNewUserForm()
        }
        console.log("getCurrentUser() - Ок!")
    } catch (error) {
        alert("getCurrentUser() - Ошибка: " + error);
        console.log("getCurrentUser() - Ошибка: ", error);
    }
}

async function getAllUsersAndFillTable() {
    try {
        let httpResponse = await fetch("http://localhost:8080/api/users");
        let allUsers = await httpResponse.json();
        let tempTrTable = "";
        allUsers.forEach(user => {
            tempTrTable += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${user.rolesToString}</td>
                    <td>
                        <button type="button" onclick="fillEditWindow(this)"
                                class="btn btn-info"
                                data-bs-toggle="modal"
                                data-bs-target="#modalEditUser">
                            Edit
                        </button>
                    </td>
                    <td>
                        <button type="button" onclick="fillDeleteWindow(this)"
                                class="btn btn-danger"
                                data-bs-toggle="modal"
                                data-bs-target="#modalDeleteUser">
                            Delete
                        </button>
                    </td>      
                </tr>
               `;
        })
        document.querySelector("#admin-allUsers tbody").innerHTML = tempTrTable;
        console.log("getAllUsersAndFillTable() - Ок!")
    } catch (error) {
        alert("getAllUsersAndFillTable() - Ошибка: " + error);
        console.log("getAllUsersAndFillTable() - Ошибка: ", error);
    }
}

async function sendEditedUserToREST() {
    let selectedRoles = () => {
        let arrayOfRoles = []
        let options = document.querySelector('#inputRoleModal').options
        if (options.length !== 2) {
            alert("sendEditedUserToREST() - Ошибка: количество ролей != 2");
        } else {
            if (options[0].selected) arrayOfRoles.push(1)
            if (options[1].selected) arrayOfRoles.push(2)
        }
        return arrayOfRoles;
    }
    let editedUser = {
        id: document.querySelector("#inputIdModal").value,
        firstName: document.querySelector("#inputFirstNameModal").value,
        lastName: document.querySelector("#inputLastNameModal").value,
        age: document.querySelector("#inputAgeModal").value,
        email: document.querySelector("#inputEmailModal").value,
        password: document.querySelector("#inputPasswordModal").value,
        roles: selectedRoles()
    };
    try {
        await fetch("http://localhost:8080/api/users", {
            method: 'PUT',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(editedUser)
        });
        console.log("sendEditedUserToREST() - Ок!")
        getAllUsersAndFillTable()
    } catch (error) {
        alert("sendEditedUserToREST() - Ошибка: " + error);
        console.dir("sendEditedUserToREST() - Ошибка: ", error);
    }
    // закрыть окно
    modalWindow = bootstrap.Modal.getInstance(document.getElementById('modalEditUser'));
    modalWindow.hide()
}

async function sendNewUserToREST() {
    let selectedRoles = () => {
        let arrayOfRoles = []
        let options = document.querySelector('#inputRole').options
        if (options.length !== 2) {
            alert("sendNewUserToREST() - Ошибка: количество ролей != 2");
        } else {
            if (options[0].selected) arrayOfRoles.push(1)
            if (options[1].selected) arrayOfRoles.push(2)
        }
        return arrayOfRoles;
    }
    let newUser = {
        firstName: document.querySelector("#inputFirstName").value,
        lastName: document.querySelector("#inputLastName").value,
        age: document.querySelector("#inputAge").value,
        email: document.querySelector("#inputEmail").value,
        password: document.querySelector("#inputPassword").value,
        roles: selectedRoles()
    };
    try {
        await fetch("http://localhost:8080/api/users", {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(newUser)
        });
        console.log("sendNewUserToREST() - Ок!")
        getAllUsersAndFillTable()
        cleanNewUserForm()
        alert("User successfully added!")
    } catch (error) {
        alert("sendNewUserToREST() - Ошибка: " + error);
        console.dir("sendNewUserToREST() - Ошибка: ", error);
    }
}

async function deleteUserOnREST() {
    let id = document.querySelector("#inputIdModalDel").value;
    try {
        await fetch(`http://localhost:8080/api/users/${id}`, {
            method: 'DELETE'
        });
        console.log("deleteUserOnREST() - Ок!");
        getAllUsersAndFillTable();
    } catch (error) {
        alert("deleteUserOnREST() - Ошибка: " + error);
        console.dir("deleteUserOnREST() - Ошибка: ", error);
    }
    // закрыть окно
    modalWindow = bootstrap.Modal.getInstance(document.getElementById('modalDeleteUser'));
    modalWindow.hide()
}

function fillEditWindow(thisButtonOnTable) {
    let rowCells = thisButtonOnTable.parentNode.parentNode.getElementsByTagName("td")
    document.querySelector("#inputIdModal").value = rowCells[0].textContent
    document.querySelector("#inputFirstNameModal").value = rowCells[1].textContent
    document.querySelector("#inputLastNameModal").value = rowCells[2].textContent
    document.querySelector("#inputAgeModal").value = rowCells[3].textContent
    document.querySelector("#inputEmailModal").value = rowCells[4].textContent
    document.querySelector("#inputPasswordModal").value = rowCells[4].textContent

    let roleOnForm = document.querySelector("#inputRoleModal")
    let roleFromTable = rowCells[5].textContent
    roleOnForm.options[0].selected = false
    roleOnForm.options[1].selected = false
    if (roleFromTable.search("USER") !== -1) {
        roleOnForm.options[0].selected = true
    }
    if (roleFromTable.search("ADMIN") !== -1) {
        roleOnForm.options[1].selected = true
    }
    console.log("fillEditWindow() - Ок!");
}

function fillDeleteWindow(thisButtonOnTable) {
    let rowCells = thisButtonOnTable.parentNode.parentNode.getElementsByTagName("td")
    document.querySelector("#inputIdModalDel").value = rowCells[0].textContent
    document.querySelector("#inputFirstNameModalDel").value = rowCells[1].textContent
    document.querySelector("#inputLastNameModalDel").value = rowCells[2].textContent
    document.querySelector("#inputAgeModalDel").value = rowCells[3].textContent
    document.querySelector("#inputEmailModalDel").value = rowCells[4].textContent
    console.log("fillDeleteWindow() - Ок!");
}

function cleanNewUserForm() {
    document.querySelector("#inputFirstName").value = ""
    document.querySelector("#inputLastName").value = ""
    document.querySelector("#inputAge").value = ""
    document.querySelector("#inputEmail").value = ""
    document.querySelector("#inputPassword").value = ""
    document.querySelector('#inputRole').options[0].selected = true
    console.log("cleanNewUserForm() - Ок!");
}

getCurrentUserAndFillNavbarAndTable()