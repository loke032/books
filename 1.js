let myLibrary = []
const container = document.querySelector(".container")
const form = document.querySelector("#book-form")

form.addEventListener("submit", function(event) {
    event.preventDefault()
    const title = form.title.value
    const author = form.author.value
    const pages = form.pages.value
    const read = form.read.checked
    addBookToLibrary(title, author, pages, read)
    form.reset()
})

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = crypto.randomUUID()
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
    displayBooks()
}

Book.prototype.toggleRead = function() {
    this.read = !this.read
    displayBooks()
    
}


function displayBooks() {
    container.innerHTML = ""

    for (let i=0;i < myLibrary.length; i++) {
        const book = myLibrary[i]

        let card = document.createElement("div")
        card.classList.add("card")

        const cardInfo = document.createElement("div")
        cardInfo.classList.add("card-info")

        const title = document.createElement("div")
        title.classList.add("title")
        title.innerText = book.title

        const author = document.createElement("div")
        author.classList.add("author")
        author.innerText = `By ${book.author}`

        const pages = document.createElement("div")
        pages.classList.add("pages")
        pages.innerText = `Pages: ${book.pages}`

        const read = document.createElement("button")
        read.classList.add("read")
        read.innerText = book.read ? "Read" : "Not read"

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-button")
        deleteButton.innerText = "Delete Book"
        
        cardInfo.appendChild(title)
        cardInfo.appendChild(author)
        cardInfo.appendChild(pages)
        cardInfo.appendChild(read)
        

        card.appendChild(cardInfo)
        card.appendChild(deleteButton)

        container.appendChild(card)

        deleteButton.addEventListener("click", function(event) {
            removeBook(book.id)
            displayBooks()
        })

        read.addEventListener("click", function() {
            book.toggleRead()
        })
    }
}


function removeBook(id) {
    myLibrary = myLibrary.filter(book => book.id !== id)
}




