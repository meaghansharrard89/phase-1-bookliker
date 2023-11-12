document.addEventListener("DOMContentLoaded", function() {
});

let bookList = []
const url = 'http://localhost:3000/books';

fetch('http://localhost:3000/books')
.then(res => res.json())
.then(book => {
    bookList = book
    loopThroughBooks(bookList)
})

function loopThroughBooks(book){
    book.forEach(book => displayBookTitles(book))
}

function displayBookTitles(book){
    const newListItem = document.createElement('li')
    const existingList = document.getElementById('list-panel')
    newListItem.innerHTML = book.title
    existingList.append(newListItem)

    newListItem.addEventListener('click', () => {
        addNewBook(book.id)
    })
}

function addNewBook(id){
    fetch(`${url}/${id}`)
    .then(res => res.json())
    .then(data => displayBookInfo(data))
}

function displayBookInfo(book){
    const showList = document.getElementById('show-panel')
    const users = book.users
    const button = document.createElement('button')
    let userList = ''
    users.forEach(book => {
        userList += `<li>${book.username}</li>`
    })

    showList.innerHTML = `
        <img src=${book.img_url} />
        <h1>${book.title}</h1>
        <h2>${book.subtitle}</h2>
        <h3>${book.author}</h3>
        <p>${book.description}</p>`
        
    const list = document.createElement('ul')
    list.innerHTML = userList
    showList.append(list)
    
    button.className = 'like-btn'
    button.id = book.id
    button.textContent = 'Like ❤️'
    showList.append(button)

    button.addEventListener('click', () => {
        const newName = document.createElement('li')
        newName.textContent = 'meaghan'
        list.append(newName)
        sendPatch(book)
    })
}

//not sending PATCH correctly
function sendPatch(book){
    const newUser = {
        id: book.id,
        username: "meaghan"
    }
        fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                users: [
                ...book.users,
                newUser
            ]
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }