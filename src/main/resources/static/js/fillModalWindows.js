function fillEditWindow(thisButtonOnTable) {
    let rowCells = thisButtonOnTable.parentNode.parentNode.getElementsByTagName("td")
    document.querySelector("#inputIdModal").value = rowCells[0].textContent
    document.querySelector("#hiddenInputIdModal").value = rowCells[0].textContent
    document.querySelector("#inputFirstNameModal").value = rowCells[1].textContent
    document.querySelector("#inputLastNameModal").value = rowCells[2].textContent
    document.querySelector("#inputAgeModal").value = rowCells[3].textContent
    document.querySelector("#inputEmailModal").value = rowCells[4].textContent
    document.querySelector("#inputPasswordModal").value = rowCells[4].textContent

    let roleOnForm = document.querySelector("#inputRoleModal")
    let roleFromTable = rowCells[5].textContent
    roleOnForm.options[0].selected = false
    roleOnForm.options[1].selected = false
    if (roleFromTable.search("ADMIN") !== -1) {
        roleOnForm.options[0].selected = true
    }
    if (roleFromTable.search("USER") !== -1) {
        roleOnForm.options[1].selected = true
    }
}

function fillDeleteWindow(thisButtonOnTable) {
    let rowCells = thisButtonOnTable.parentNode.parentNode.getElementsByTagName("td")
    document.querySelector("#inputIdModalDel").value = rowCells[0].textContent
    document.querySelector("#inputFirstNameModalDel").value = rowCells[1].textContent
    document.querySelector("#inputLastNameModalDel").value = rowCells[2].textContent
    document.querySelector("#inputAgeModalDel").value = rowCells[3].textContent
    document.querySelector("#inputEmailModalDel").value = rowCells[4].textContent
    // Дописываем в action формы id удаляемого user-a
    document.querySelector("#deleteForm").action = document.querySelector("#deleteForm").action + rowCells[0].textContent
}