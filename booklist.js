class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        
    }
}

class UI{
    addBook(book){
        let addrow = document.querySelector("#addrow");
        let addcol = addrow.appendChild(document.createElement("tr"));
     //    addcol.appendChild(document.createElement("td"));
         addcol.innerHTML = `<td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td><a href="#" class="delete-item">X</a></td>`;

       
    }

    clearField(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }

    showAlert(message, className){
        let div = document.createElement("div");
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector(".container");
        let form = document.querySelector("#form");

        container.insertBefore(div, form);

        setTimeout(function () {
           document.querySelector(".alert").remove(); 
        }, 3000);
    }

    removeBook(rmItem){
        rmItem.parentElement.parentElement.remove();
    }
}

class Storage{
    static getDataItem(){
    let books;
    if(localStorage.getItem("books") === null){
        books = [];
    }else{
        books = JSON.parse(localStorage.getItem("books"));
    }
    return books;

}

    static setDataItem(book){
        let books = Storage.getDataItem();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static showDataItem(){
        let books = Storage.getDataItem();
        books.forEach(function(book){
            let ui = new UI();
            ui.addBook(book);
        });
        
    }

    static removeDataItem(isbn){
        let books = Storage.getDataItem();
        books.forEach(function(book, index){
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem("books", JSON.stringify(books));
    }
}

document.addEventListener("DOMContentLoaded", Storage.showDataItem);

document.querySelector("#button").addEventListener("click", bdetails);
function bdetails(e) {
    
    let title, author, isbn;

    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    isbn = document.querySelector("#isbn").value;

    let book = new Book(title, author, isbn);

    
    let ui = new UI();

    if(title === "" || author === "" || isbn === ""){
        ui.showAlert("Please fill the details", "failed");
    }else{
        ui.addBook(book);
        Storage.setDataItem(book);
        // Storage.showDataItem();
        ui.showAlert("Book added to the list", "sucsses");
        ui.clearField();
    }
 

    e.preventDefault();
}

document.querySelector("#addrow").addEventListener("click", removerow);

function removerow(e){
    if(e.target.classList.contains("delete-item")){
        e.target
        let elesbil = e.target.parentElement.previousElementSibling.textContent;
        Storage.removeDataItem(elesbil);
        let ui = new UI();
        ui.removeBook(e.target);
        ui.showAlert("Book removed from the list", "sucsses");
    }

}
