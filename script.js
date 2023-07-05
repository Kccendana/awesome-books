/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
const list = document.querySelector('.list');
const addNew = document.querySelector('.add-new');
const contact = document.querySelector('.contact');
const listSect = document.querySelector('#list');
const addNewForm = document.querySelector('#add-new');
const contactSect = document.querySelector('#contact');

list.addEventListener('click', () => {
  listSect.style.display = 'block';
  contactSect.style.display = 'none';
  addNewForm.style.display = 'none';
})

addNew.addEventListener('click', () => {
  addNewForm.style.display = 'flex';
  listSect.style.display = 'none';
  contactSect.style.display = 'none';
})

contact.addEventListener('click', () => {
  contactSect.style.display = 'block';
  listSect.style.display = 'none';
  addNewForm.style.display = 'none';
})

const displayDate = document.querySelector('.date');
const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const currentDate = new Date();
date1 = [1, 11, 21, 31];

let ordinal;
if (currentDate.getDate() in date1) {
  ordinal = 'st';
}else if (currentDate.getDate() === 2 || currentDate.getDate() ===22) {
  ordinal = 'nd';
} else if (currentDate.getDate() === 3 || currentDate.getDate() ===23) {
  ordinal = 'rd';
} else {
  ordinal = 'th';
}

let amPm;
if (currentDate.getHours() < 12) {
  amPm = 'am';
} else {
  amPm = 'pm';
}

displayDate.textContent = `${monthName[currentDate.getMonth()]} ${currentDate.getDate()}${ordinal} ${currentDate.getFullYear()}, ${currentDate.getHours() - 12}:${currentDate.getMinutes()}:${currentDate.getSeconds()} ${amPm}`
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
    // this.displayBooks();
  }

  removeBook(index) {
    this.booksArray.splice(index, 1);
    localStorage.setItem('bookItems', JSON.stringify(this.booksArray));
    this.displayBooks();
  }

  displayBooks() {
    const bookListDiv = document.querySelector('#book-container');
    bookListDiv.innerHTML = '';

    const booklistHeading = document.querySelector('.list-title');
    if (this.booksArray.length === 0) {
      bookListDiv.style.border = 'none';
      booklistHeading.innerHTML = 'No book on the list';
    } else {
      booklistHeading.innerHTML = 'All awesome books';
    }

    this.booksArray.forEach((book, index) => {
      bookListDiv.innerHTML += `
      <li><span><strong>"${book.title}"</strong> by <strong>${book.author}</strong></span><button class="button" id="remove" data-index="${index}">Remove</button></li>`;
      bookListDiv.style.border = '2px solid';
      const removeBtns = document.querySelectorAll('.button');
     
      removeBtns.forEach((button) => {
        button.addEventListener('click', (event) => {
          const { index } = event.target.dataset;
          this.removeBook(index);
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