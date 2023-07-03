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

// Function to display all books in the collection
function displayBooks() {
  const bookListDiv = document.querySelector('#book-container');
  bookListDiv.innerHTML = ''; // Clear previous book list
  // Iterate through the books and create HTML elements for each book
  for (let i = 0; i < itemArray.length; i++) {
      const book = itemArray[i];
      // Create a div element for the book
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      // Create paragraph elements for the title and author
      const title = document.createElement('p');
      title.textContent = book.title;
      const author = document.createElement('p');
      author.textContent = book.author;
      // Create a remove button for the book
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', () => {
          removeBook(i);
      });
      const line = document.createElement('hr');
      // Append the elements to the book div
      bookDiv.appendChild(title);
      bookDiv.appendChild(author);
      bookDiv.appendChild(removeButton);
      bookDiv.appendChild(line);
      // Append the book div to the book list
      bookListDiv.appendChild(bookDiv);
  }
}
// Function to remove a book from the collection
function removeBook(index) {
  itemArray.splice(index, 1);
  localStorage.setItem('bookItems', JSON.stringify(itemArray));
  displayBooks();
}
// Display existing books on page load
displayBooks();