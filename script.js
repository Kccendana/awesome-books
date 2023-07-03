const addButton = document.querySelector('#add');
let itemArray = JSON.parse(localStorage.getItem('bookItems')) || [];

addButton.addEventListener('click', () => {
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const title = titleInput.value;
    const author = authorInput.value;
    addBook(title, author);
});

function addBook(title, author) {
    const newBook = { title: title, author: author };
    itemArray.push(newBook);
    localStorage.setItem('bookItems', JSON.stringify(itemArray));
    displayBooks();
}

