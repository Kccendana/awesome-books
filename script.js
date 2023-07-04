/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookList {
  constructor() {
    this.booksArray = JSON.parse(localStorage.getItem('bookItems')) || [];
  }

  addBook(title, author) {
    const book = new Book(title, author);
    this.booksArray.push(book);
    localStorage.setItem('bookItems', JSON.stringify(this.booksArray));
    this.displayBooks();
  }

  removeBook(index) {
    this.booksArray.splice(index, 1);
    localStorage.setItem('bookItems', JSON.stringify(this.booksArray));
    this.displayBooks();
  }

  displayBooks() {
    const bookListDiv = document.querySelector('#book-container');
    bookListDiv.innerHTML = '';
    this.booksArray.forEach((book, index) => {
      bookListDiv.innerHTML += `
      <li><span><strong>"${book.title}"</strong> by <strong>${book.author}</strong></span><button class="button" id="remove" data-index="${index}">Remove</button></li>`;
      bookListDiv.style.border = '2px solid';
      const removeBtns = document.querySelectorAll('.button');

      removeBtns.forEach((button) => {
        button.addEventListener('click', (event) => {
          const { index } = event.target.dataset;
          this.removeBook(index);
          if (this.booksArray.length === 0) {
            bookListDiv.style.border = 'none';
          }
        });
      });
    });
  }
}

const booklist = new BookList();

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const title = titleInput.value;
  const author = authorInput.value;

  if (title && author) {
    booklist.addBook(title, author);
    titleInput.value = '';
    authorInput.value = '';
  } else {
    event.preventDefault();
    titleInput.value = '';
    authorInput.value = '';
  }
});

booklist.displayBooks();