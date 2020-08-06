function showModalWindow (obj) {
    let modalWindow = document.querySelectorAll(".maket#third .modal-window")[0];
    let modalWindowProductImage = document.querySelectorAll(".maket#third .modal-window img")[0];

    modalWindowProductImage.setAttribute("src", obj.getAttribute("src"));
    modalWindow.style.display = "block";
}

function closeModalWindow () {
    let modalWindow = document.querySelectorAll(".maket#third .modal-window")[0];
    modalWindow.style.display = "none";
}